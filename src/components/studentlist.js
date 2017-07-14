import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAll, editStudent, deleteStudent } from '../actions';

class StudentList extends Component {
    componentDidMount() {
        this.props.fetchAll();
    };

    editStudent(id) {
        this.props.editStudent(id);
    };

    deleteStudent(id) {
        this.props.deleteStudent(id).then(() => this.props.fetchAll());
    };

    renderList() {
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
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.grade}</td>
                    {/* <td><button className='btn btn-outline-warning' onClick={() => {this.editStudent(student._id)}}>Edit</button></td> */}
                    <td><button className='btn btn-outline-danger' onClick={() => {this.deleteStudent(student._id)}}>Delete</button></td>
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
                            <th>Operations</th>
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
        list: state.list.data
    };
};

export default connect(mapStateToProps, { fetchAll, editStudent, deleteStudent })(StudentList);