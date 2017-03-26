import * as types from '../constants/friendshipsActionsConst';
import _ from 'lodash';

const initialState = {
    friends: {},
    online: {}
};

export default function friendsReducer(state = initialState, {type, payload}) {
    switch (type) {
        case types.getFriendsRequest:
            return state;
        case types.getFriendsSuccess:
            return {
                ...state,
                friends: _.mapKeys(payload, 'id')
            };
        case types.getFriendsError:
            console.log(type, payload);
            return state;
        default: return state;
    }
}