import _ from 'lodash';
import * as types from '../constants/feedsActionsConst';
import FeedService from '../services/feed.service';

export function fetchFeeds() {
    return (dispatch, store) => {
        if (_.isEmpty(store()['feeds']['feeds'])) {
            dispatch({type: types.fetchFeedsRequest});
            FeedService.fetchFeeds()
                .then(res => dispatch({type: types.fetchFeedsSuccess, payload: res.data.data}))
                .catch(error => dispatch({type: types.fetchFeedsError, payload: error}));
        }
    }
}