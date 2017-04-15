import React from 'react';
import { connect } from 'react-redux';

import GroupProfile from './GroupProfile';
import Container from '../ContentContainer';
import Messages from '../Messages/Messages';

import { createGroupMessage, leaveGroup, addUserToGroup } from '../../actions/groupsActions';
import '../../styles/GroupStyles.scss';

class GroupContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {openedProfile: false};
        this.onSubmitMessage = this.onSubmitMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id != this.props.id) {
            this.state.openedProfile = false;
        }
    }

    render() {
        let { messages, user_id, id, group, onLeaveClick, friends, onAddUserToGroup } = this.props;
        return (
            <Container left={true} right={true}>
                <div className="group-container-offline">
                    {
                        group &&
                            <div
                                className="profile-label"
                                onClick={() => this.setState({openedProfile: !this.state.openedProfile})}
                            >
                                {group.name} {this.state.openedProfile ? "\u00AB" : "\u00BB"}
                            </div>
                    }
                    {
                        !this.state.openedProfile &&
                        <Messages
                            messages={messages}
                            onSubmitMessage={this.onSubmitMessage}
                            user_id={user_id}
                            id={id}
                        />
                    }
                    {
                        this.state.openedProfile &&
                            <GroupProfile
                                group={group}
                                onLeaveClick={onLeaveClick}
                                onAddUserClick={onAddUserToGroup}
                                friends={friends}
                            />
                    }
                </div>
            </Container>
        );
    }

    onSubmitMessage(text) {
        let { createGroupMessage, id } = this.props;
        createGroupMessage(id, text);
    }
}

export default connect(
    (state, r) => ({
        id: r.params.id,
        messages: state['groupsReducer']['messages'][r.params.id],
        user_id: state['currentUserReducer']['user'].id,
        group: state['groupsReducer']['groups'][r.params.id],
        friends: state['friendsReducer']['friends']
    }),
    dispatch => ({
        createGroupMessage: (id, text) => dispatch(createGroupMessage(id, text)),
        onLeaveClick: (id) => dispatch(leaveGroup(id)),
        onAddUserToGroup: (group_id, user_id) => dispatch(addUserToGroup(group_id, user_id))
    })
)(GroupContainer);