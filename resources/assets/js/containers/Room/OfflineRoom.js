import React from 'react';

export default class OfflineRoom extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (<ul>{this.props.messages.map((item, index) => {
            return (<li key={index}>{item.text}</li>);
        })}</ul>);

    }
}