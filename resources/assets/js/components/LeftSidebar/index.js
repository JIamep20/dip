import React from 'react';
import LeftSidebar from './LeftSidebar';

import { connect } from 'react-redux';

const Component = (props) => {
    let { friendships, groups } = props;
    return (<LeftSidebar friendships={friendships} groups={groups} />);
};

export default connect(
    state => ({
        friendships: state.friendships.friendships,
        groups: state.groups.groups
    })
)(Component);

