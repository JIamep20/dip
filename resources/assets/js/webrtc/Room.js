import _ from 'lodash';
import Peer from './Peer';

class Room {
    getState = null;
    dispatch = null;
    status = 0;
    type = 0;
    id = 0;
    peers = {};
    static STATUS_IDLE = 0;
    static STATUS_BUSY = 1;
    static STATUS_READY = 2;

    static ROOM_TYPE_IDLE = 0;
    static ROOM_TYPE_FRIEND = 1;
    static ROOM_TYPE_GROUP = 2;

    constructor(getState, dispatch) {
        this.getState = getState;
        this.dispatch = dispatch;
        this.crossBrowser();
    }

    startCall(id, type) {
        if (!this.isAbleToStart()) {
            return false;
        }
        this.id = id;
        let users = [];
        switch (type) {
            case Room.ROOM_TYPE_FRIEND:
                let user = this.getState()['friendsReducer']['friends'][id];
                if (user && user.id == this.id) {
                    users = [this.id];
                }
                break;
            case Room.ROOM_TYPE_GROUP:
                let group = this.getState()['groupsReducer']['groups'][id];
                if (group && group.users) {
                    users = _.map(group.users, 'id');
                }
                break;
        }
        if (!users) {
            return false;
        }
        this.status = Room.STATUS_BUSY;
        this.type = type;
        _.forEach(users, (item) => {
            let peer = new Peer(item);
            /** Events here */
            this.peers[item] = peer;
        });

    }

    acceptCall(id, type) {
        if (!this.isAbleToAccept()) {
            return false;
        }
    }

    disconnect() {
        if (this.isAbleToStart()) {
            return false;
        }
    }

    isAbleToStart() {
        return this.status == Room.STATUS_IDLE;
    }

    isAbleToAccept() {

    }

    static crossBrowser() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        window.RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;
        window.RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate;
    }
}

export default Room;