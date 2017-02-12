import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import {connect} from 'react-redux';

import '../styles/LeftSidebarStyles.scss';
import ReactTransitionGroup from 'react-addons-css-transition-group';

class LeftSidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {users: []};
    }

    render() {
        const {left} = this.props.sidebars;
        var friends = this.props.friends.map((item, index) => {
            return (<li key={index}>
                <Link to={`/room/${item.room[0].id}`}>
                    <span className={`circle ${item.status || false ? 'circle-green' : 'circle-red'}`}></span>
                    {item.user.name}
                </Link>
            </li>)
        });

        var opened = left ? 'opened-left-sidebar' : '';
        return (
            <div className={`left-sidebar ${opened}`}>
                <ul className="friends">
                    <ReactTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {friends}
                    </ReactTransitionGroup>
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        sidebars: state.sidebars,
        friends: state.users.friends
    })
)(LeftSidebar);