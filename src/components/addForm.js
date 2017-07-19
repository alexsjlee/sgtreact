import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchAll, addStudent } from '../actions'

class AddForm extends Component {
    onFormSubmit(value) {
        const { reset } = this.props;
        this.props.addStudent(value).then(reset).then(() => this.props.fetchAll());
    };

    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <input
                    type="text"
                    className='form-control form-control-danger'
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <div className='form-control-feedback'>
                    {touched ? error : ''}
                </div>
            </div>
        );
    };

    render() {
        const { handleSubmit, reset } = this.props;

        return(
            <div>
                <h4>Add A New Student</h4>
                <div>
                    <form >
                        <Field
                            name='name'
                            placeholder='Student Name'
                            component={this.renderField}
                        />
                        <Field
                            name='course'
                            placeholder='Student Course'
                            component={this.renderField}
                        />
                        <Field
                            name='grade'
                            placeholder='Student Grade'
                            component={this.renderField}
                        />
                        <button className='btn btn-outline-success' onClick={handleSubmit((value) => this.onFormSubmit(value))}>Add</button>
                        <button className='btn btn-outline-warning' type='button' onClick={ reset }>Cancel</button>
                    </form>
                </div>
            </div>
        );
    };
};

function validate(values) {
    const errors = {};

    if(!values.name) {
        errors.name = 'Please enter a student name.'
    };
    if(!values.course) {
        errors.course = 'Please enter the student\' course.'
    };
    if(!values.grade) {
        errors.grade = 'Please enter a grade for the student.'
    }

    return errors;
};

AddForm = reduxForm({
    validate,
    form: 'add-form'
})(AddForm);

export default connect(null, { addStudent, fetchAll })(AddForm);