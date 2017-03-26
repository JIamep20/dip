import socketClient from '../socketClient';
import _ from 'lodash';

import {
    FETCH_ROOM_MESSAGES_REQUEST,
    FETCH_ROOM_MESSAGES_SUCCESS,
    FETCH_ROOM_MESSAGESS_ERROR
} from '../actions/messagesActions';

const initialState = {
    messagesByRooms: {}
};

export default function messagesReducer(state = initialState, {type, payload})
{
    switch(type){
        case FETCH_ROOM_MESSAGES_SUCCESS:
            let item = _.get(state.messagesByRooms, [payload.id], {});
            item.storage = payload.messages;
            return {...state, messagesByRooms: {...state.messagesByRooms, [payload.id]: item}};
        default:
            return state;
    }
}