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

    componentDidMount() {
        axios.get('api/friends')
            .then((req) => {
                var users = req.data.data.map((user, index) => {
                    user.user = user.invited || user.initiator;
                    delete user.invited; delete user.initiator;
                    return user;
                });
                this.setState({users: users});
            });
    }

    render() {

        const {left} = this.props.sidebars;

        var users = this.state.users.map((item, key) => {
            return (<li key={item.id}>
                <Link to={`/room/${item.room[0].id}`}>
                    <span className="circle circle-orange"></span>
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
                        {users}
                    </ReactTransitionGroup>
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({sidebars: state.sidebars})
)(LeftSidebar);