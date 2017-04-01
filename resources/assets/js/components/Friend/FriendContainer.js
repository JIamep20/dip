import React from 'react';
import { connect } from 'react-redux';

import FriendPresentation from './FriendPresentation';
import Container from '../ContentContainer';

import { createFriendMessage } from '../../actions/friendsActions';

class FriendContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { messages, id, createFriendMessage } = this.props;
        return (
            <Container left={true} right={true}>
            <FriendPresentation
                messages={messages}
                onSubmitMessage={createFriendMessage}
                id={id}
            />
            </Container>
        );
    }
}

export default connect(
    (state, r) => ({
        id: r.params.id,
        friend: state['friendsReducer']['friends'][r.params.id],
        messages: state['friendsReducer']['messages'][r.params.id]
    }),
    dispatch => ({
        createFriendMessage: (id, text) => dispatch(createFriendMessage(id, text))
    })
)(FriendContainer);