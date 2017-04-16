import * as types from '../constants/feedsActionsConst';
import _ from 'lodash';

const initialState = {
    feeds: []
};

export default function feedsReducer(state = initialState, {type, payload}) {
    switch (type) {
        case types.fetchFeedsRequest:
            return state;
        case types.fetchFeedsSuccess:
            return {
                ...state,
                feeds: payload
            };
        case types.fetchFeedsError:
            console.log(type, payload);
            return state;


        default: return state;
    }
}
