import MessagesService from '../services/messages.service';

export const FETCH_ROOM_MESSAGES_REQUEST = 'FETCH_ROOM_MESSAGES_REQUEST';
export const FETCH_ROOM_MESSAGES_SUCCESS = 'FETCH_ROOM_MESSAGES_SUCCESS';
export const FETCH_ROOM_MESSAGESS_ERROR = 'FETCH_ROOM_MESSAGESS_ERROR';

export function fetchRoomMessages(id, check = false) {
    return (dispatch, getStore) => {
        let state = getStore();
        if (!_.get(state, `messages.messagesByRooms.${id}`, false)) {
            MessagesService.getRoomMessages(id)
                .then(messages => dispatch({type: FETCH_ROOM_MESSAGES_SUCCESS, payload: {id, messages}}))
                .catch(error => dispatch({type: FETCH_ROOM_MESSAGESS_ERROR, payload: error}));
        }
    }
}

export function postRoomMessage(message) {

}