import React from 'react';
import { connect } from 'react-redux';

import GroupPresentation from './GroupPresentation';
import Container from '../ContentContainer';
import Messages from '../Messages/Messages';

import { createGroupMessage } from '../../actions/groupsActions';
import '../../styles/GroupStyles.scss';

class GroupContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitMessage = this.onSubmitMessage.bind(this);
    }

    render() {
        let { messages, user_id, id } = this.props;
        return (
            <Container left={true} right={true}>
                <div className="group-container-offline">
                    <div style={{height: '100px', backgroundColor: 'black'}}></div>
                    <Messages
                        messages={messages}
                        onSubmitMessage={this.onSubmitMessage}
                        user_id={user_id}
                        id={id}
                    />
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
        user_id: state['currentUserReducer']['user'].id
    }),
    dispatch => ({
        createGroupMessage: (id, text) => dispatch(createGroupMessage(id, text))
    })
)(GroupContainer);