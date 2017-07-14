import { combineReducers } from 'redux';
import StudentList from './reducer_students';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    list: StudentList,
    form: formReducer
});

export default rootReducer;