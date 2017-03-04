import React from 'react';

import {connect} from 'react-redux';

import OfflineRoom from './OfflineRoom';

class RoomContainer extends React.Component {
    constructor(props) {
        super(props);
        debugger;
    }

    componentWillMount

    render() {
        var {left, right} = this.props.sidebars;
        left = left ? 'opened-left-sidebar-container ' : '';
        right = /*right ? 'opened-right-sidebar-container' :*/ '';
        return (
            <div className={`container ${left} ${right}`}>
                <OfflineRoom />
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        sidebars: state.sidebars,
        ownProps: ownProps
    })
)(RoomContainer);