import React from 'react';
import { connect } from  'react-redux';

import '../../styles/MessagesStyles.scss';

import MessagesList from './MessagesList';
import MessagesInput from './MessagesInput';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let { messages, onSubmitMessage, user_id, id } = this.props;

        return(
            <div className="messages-container">
                <MessagesList
                    messages={messages}
                    user_id={user_id}
                    id={id}
                />
                <MessagesInput
                    onSubmitMessage={onSubmitMessage}
                />
            </div>
        );
    }
}