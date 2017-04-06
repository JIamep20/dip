import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';

export default class MessagesList extends React.Component {
    constructor(props) {
        super(props);

        this.generateMessagesList = this.generateMessagesList.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.scroll = true;
    }

    render() {
        return (
            <ul className="messages-list" onScroll={this.onScroll}>
                {this.generateMessagesList()}
            </ul>
        );
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id != this.props.id) {
            this.scroll = true;
        }
    }

    componentDidUpdate() {
        if(this.scroll) {
            var scrollableDomEl = ReactDOM.findDOMNode(this);
            scrollableDomEl.scrollTop = scrollableDomEl.scrollHeight;
        }
    }

    onScroll(e) {
        let { target:t } = e;
        if(t.scrollTop + t.clientHeight == t.scrollHeight) {
            this.scroll = true;
        } else {
            this.scroll = false;
        }
    }

    generateMessagesList() {
        let { messages, user_id } = this.props;
        return _.map(messages, (item, index) => (
            <li key={index} className={`message-item ${item.user_id == user_id ? 'owner' : ''}`}>
                <span className="authror">{item.user.name}</span>
                <span className="created-at">{item.created_at}</span>
                <hr />
                <code>{item.text}</code>
            </li>
        ));
    }
}