import React from 'react';
import LeftSidebar from './LeftSidebar';

import { connect } from 'react-redux';

const Component = (props) => {
    let { friendships, groups, online } = props;
    return (<LeftSidebar friendships={friendships} groups={groups} online={online} />);
};

export default connect(
    state => ({
        friendships: state.friendships.friendships,
        groups: state.groups.groups,
        online: state.friendships.online
    })
)(Component);

