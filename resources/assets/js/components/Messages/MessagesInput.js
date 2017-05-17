import React from 'react';

export default class MessagesInput extends React.Component {
    constructor(props) {
        super(props);

        this.createMessage = this.createMessage.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    render() {
        return (
            <div className="messages-input">
                <button onClick={this.createMessage}>OK</button>
                <textarea ref={el => this.messageInput = el} onKeyPress={this.onKeyPress}></textarea>
            </div>
        );
    }

    createMessage() {
        if(this.messageInput.value.trim()) {
            this.props.onSubmitMessage(this.messageInput.value);
            this.messageInput.value = "";
        }
    }

    onKeyPress(e) {
        if(e.charCode == 13 && !e.shiftKey) {
            e.preventDefault();
            this.createMessage();
        }
    }
}