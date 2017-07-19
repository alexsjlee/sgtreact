import { combineReducers } from 'redux';
import StudentList from './reducer_students';
import editBoolean from './reducer_edit';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    list: StudentList,
    form: formReducer,
    edit: editBoolean
});

export default rootReducer;