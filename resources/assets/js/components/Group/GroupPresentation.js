import React from 'react';
import _ from 'lodash';

class GroupPresentation extends React.Component {
    constructor(props) {
        super(props);

        this.onButtonSubmit = this.onButtonSubmit.bind(this);
    }

    getMessagesList() {
        let { messages } = this.props;
        return _.map(messages, (item, index) => (<h3 key={index} style={{color: 'white'}}>{item.text}</h3>) );
    }

    onButtonSubmit() {
        let { onCreateMessage, id } = this.props;
        if(this.refs.messageInput.value) {
            onCreateMessage(id, this.refs.messageInput.value);
        }
        this.refs.messageInput.value = '';
    }

    render() {
        return (<div>
            {this.getMessagesList()}
            <input type="text" ref="messageInput" />
            <button onClick={this.onButtonSubmit}>asd</button>
        </div>);
    }
}

export default GroupPresentation;