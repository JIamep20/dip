import React from 'react';
import _ from 'lodash';
class FriendPresentation extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitMessage = this.onSubmitMessage.bind(this);
    }

    onSubmitMessage() {
        if(this.refs.messageText.value) {
            let { id } = this.props;
            this.props.onSubmitMessage(id, this.refs.messageText.value);
            this.refs.messageText.value = '';
        }
    }

    render() {
        let { messages } = this.props;
        return (
            <div>
                {_.map(messages, (item, key) => <h1 key={key} style={{color: 'white'}}>{item.text}</h1>)}
                <input type="text" ref="messageText"/>
                <button onClick={this.onSubmitMessage}>asd</button>
            </div>
        );
    }
}

FriendPresentation.defaultProps = {
    messages: {}
};

export default FriendPresentation;