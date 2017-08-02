import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FaPencil, FaTrash, FaFloppyO } from 'react-icons/lib/fa'
import { MdClose } from 'react-icons/lib/md'

import { fetchAll, editStudent, deleteStudent, editToggleTrue, editToggleFalse } from '../actions';

class StudentList extends Component {
    componentDidMount() {
        this.props.fetchAll();
    };

    editStudent(student) {
        this.props.editStudent(student).then(this.props.editToggleFalse()).then(() => this.props.fetchAll());
    };

    deleteStudent(id) {
        this.props.deleteStudent(id).then(() => this.props.fetchAll());
    };

    editToggleTrue(student) {
        this.props.editToggleTrue(student)
    };

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return(
            <td className={className}>
                <input
                    type='text'
                    className='form-control form-control-danger'
                    style={{maxWidth: field.maxWidth + 'px'}}
                    {...field.input}
                />
                <div className='form-control-feedback'>
                    {touched ? error : ''}
                </div>
            </td>
        )
    }

    renderList() {
        const { handleSubmit } = this.props;
        if(!this.props.list) {
            return(
                <tr>
                    <td>No students to list!</td>
                </tr>
            )
        };
        return this.props.list.students.map((student) => {
            return(
                <tr key={student._id}>
                    {this.props.edit.boolean && student._id === this.props.edit.student.student._id ? <Field name='name' current={this.props.edit.student.student.name} maxWidth='150' component={this.renderField}/> : <td>{student.name}</td> }
                    {this.props.edit.boolean && student._id === this.props.edit.student.student._id ? <Field name='course' current={this.props.edit.student.student.course} maxWidth='150' component={this.renderField} /> : <td>{student.course}</td>}
                    {this.props.edit.boolean && student._id === this.props.edit.student.student._id ? <Field name='grade' current={this.props.edit.student.student.grade} maxWidth='80' component={this.renderField} /> : <td>{student.grade}</td>}
                    <td>
                        {this.props.edit.boolean && student._id === this.props.edit.student.student._id ? <button className='btn btn-outline-success' onClick={handleSubmit((student) => {this.editStudent({id: this.props.edit.student.student._id, student})})}><FaFloppyO /></button> : <button className='btn btn-outline-warning' onClick={() => {this.editToggleTrue({student})}}><FaPencil /></button>}
                        {this.props.edit.boolean && student._id === this.props.edit.student.student._id? <button className='btn btn-outline-warning' onClick={() => this.props.editToggleFalse()}><MdClose /></button> : <button className='btn btn-outline-danger' onClick={() => {this.deleteStudent(student._id)}}><FaTrash /></button>} 
                    </td> 
                </tr>
            )
        });
    };


    render() {
        return(
            <div className='container'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student Course</th>
                            <th>Student Grade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return{
        list: state.list.data,
        edit: state.edit,
        initialValues: !state.edit.student.student ? {} : {
            name: state.edit.student.student.name,
            course: state.edit.student.student.course,
            grade: state.edit.student.student.grade
        }
    };
};

function validate(values) {
    const errors = {};

    if(!values.name) {
        errors.name = 'Please enter a student name.'
    };
    if(!values.course) {
        errors.course = 'Please enter the student\'s course.'
    };
    if(!values.grade || isNaN(values.grade) === true) {
        errors.grade = 'Please enter a valid numerical grade.'
    }

    return errors;
}

StudentList = reduxForm({
    form: 'edit_form',
    enableReinitialize: true,
    validate
})(StudentList);

export default connect(mapStateToProps, { fetchAll, editStudent, deleteStudent, editToggleTrue, editToggleFalse })(StudentList);