import React from 'react';

import { connect } from 'react-redux';

import OfflineRoom from './OfflineRoom';

class RoomContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(<OfflineRoom />);
    }
}

export default connect()(RoomContainer);