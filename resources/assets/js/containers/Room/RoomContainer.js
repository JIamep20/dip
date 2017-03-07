import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as messagesActions from '../../actions/messagesActions';

import OfflineRoom from './OfflineRoom';

class RoomContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.friendship) {
            hashHistory.push('/');
        }
    }

    render() {
        var {left, right} = this.props.sidebars;
        let { messages } = this.props;
        left = left ? 'opened-left-sidebar-container ' : '';
        //right = /*right ? 'opened-right-sidebar-container' :*/ '';
        return (
            <div className={`container ${left} ${right}`}>
                <OfflineRoom messages={messages}/>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        //let friendship = _.get(state, `friends.friends.${ownProps.params.id}`, false);
        let friendship = _.find(_.get(state, 'friends.friends', []), (item) => item.room[0].id == ownProps.params.id);
        let messages = _.get(state, `messages.messagesByRooms.${_.get(friendship, 'id', false)}.storage`, []);
        return {
            sidebars: state.sidebars,
            friendship: friendship,
            messages: messages
        };
    },
    (dispatch) => ({
        messagesActions: bindActionCreators(messagesActions, dispatch)
    })
)(RoomContainer);