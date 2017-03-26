import * as types from '../reducers/sidebarsReducer';
import _ from 'lodash';

const initialState = {
    left: true,
    right: false
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        default: return state;
    }
}