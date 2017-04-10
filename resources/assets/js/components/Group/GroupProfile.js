import React from 'react';
import _ from 'lodash';

export default class GroupProfile extends React.Component {
    constructor(props) {
        super(props);

        this.onLeaveClick = this.onLeaveClick.bind(this);
    }

    onLeaveClick() {
        this.props.onLeaveClick(this.props.group.id);
    }

    render() {

        let { group, friends } = this.props;

        return (
            <div className="group-profile">
                <p>{group.name}</p>
                <button onClick={this.onLeaveClick}>Leave group!!!</button>
                <hr />
                <ul>
                    {
                        _.map(group.users, (item, index) => (<li key={index}>{item.name}</li>))
                    }
                </ul>
                <hr />
                <ul>
                    {
                        _.map(_.difference(group.users, friends), (item, index) => (<li key={index}>{item.name}</li>))
                    }
                </ul>
            </div>
        );
    }
}