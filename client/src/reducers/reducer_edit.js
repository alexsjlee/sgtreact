import actions from '../actions/types';

const DEFAULT_STATE = {
    student: {},
    boolean: false
};

export default function (state = DEFAULT_STATE, action) {
    switch(action.type) {
        case actions.EDIT_TOGGLE_TRUE:
            return action.payload;
        case actions.EDIT_TOGGLE_FALSE:
            return action.payload;
        default:
            return state;
    };
};