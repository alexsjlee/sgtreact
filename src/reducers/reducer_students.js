import _ from 'lodash';
import actions from '../actions/types'

const DEFAULT_STATE = {
    list: []
};

export default function(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case actions.FETCH_ALL:
            return action.payload;
        default:
            return state;
    };
};