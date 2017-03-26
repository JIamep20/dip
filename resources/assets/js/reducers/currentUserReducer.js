import * as types from '../constants/currentUserActionsConst';
import _ from 'lodash';

const initialState = {
    user: {},
    errors: {}
};

export default function currentUserReducer(state = initialState, {type, payload}) {
    switch (type) {
        case types.getCurrentUserRequest:
            return state;
        case types.getCurrentUserSuccess:
            return {
                ...state,
                user: payload
            };
        case types.getCurrentUserError:
            console.log(types.getCurrentUserError, payload);
            return {...state};

        case types.updateCurrentUserRequest:
            return state;
        case types.updateCurrentUserSuccess:
            return {
                ...state,
                user: payload
            };
        case types.updateCurrentUserError:
            return {
                ...state,
                errors: payload.response.data
            };

        default: return state;
    }
}