import React from 'react';

import { connect } from 'react-redux';

import Friendship from './Friendship';

const Component = (props) => {
    return (<Friendship id={props.id} />);
};

export default connect(
    (store, router) => ({
        id: router.params.id,
        friendship: store.friendships.friendships[router.params.id],
        messages: store.friendships.messages[router.params.id],
        online: !!store.friendships.online[router.params.id]
    })
)(Component);