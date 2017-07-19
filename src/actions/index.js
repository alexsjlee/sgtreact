import axios from 'axios';

import actions from './types';

const BASE_URL = 'http://localhost:3090/students';

export function fetchAll() {
    const request = axios.get(BASE_URL);

    return{
        type: actions.FETCH_ALL,
        payload: request
    };
};

export function addStudent(student) {
    const request = axios.post(BASE_URL, student);
    
    return{
        type: actions.ADD_STUDENT,
        payload: request
    };
};

export function editStudent(student) {
    const request = axios.patch(`${BASE_URL}/${student.id}`, student.student);

    return{
        type: actions.EDIT_STUDENT,
        payload: request
    };
};

export function deleteStudent(id) {
    const request = axios.delete(`${BASE_URL}/${id}`);

    return{
        type: actions.DELETE_STUDENT,
        payload: request
    };
};

export function editToggleTrue(student) {
    const response = {
        student,
        boolean: true
    }

    return {
        type: actions.EDIT_TOGGLE_TRUE,
        payload: response
    };
};

export function editToggleFalse() {
    const response = {
        student: {},
        boolean: false
    }

    return{
        type: actions.EDIT_TOGGLE_FALSE,
        payload: response
    };
};