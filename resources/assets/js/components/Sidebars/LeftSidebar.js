import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import _ from 'lodash';
import '../../styles/LeftSidebarStyles.scss';
import ReactTransitionGroup from 'react-addons-css-transition-group';

class LeftSidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {users: []};
    }

    render() {
        const { left } = this.props.sidebars;
        const { friends, online } = this.props.friends;
        var friendsList = _.map(friends, (item, index) => {
            return (<li key={index}>
                <Link to={`/room/${item.id}`}>
                    <span className={`circle ${_.get(online, [item.id], false) ? 'circle-green' : 'circle-red'}`}> </span>
                    {item.name}
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
                        {friendsList}
                    </ReactTransitionGroup>
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        sidebars: state['sidebarsReducer'],
        friends: state['friendsReducer']
    })
)(LeftSidebar);