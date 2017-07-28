import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAll } from '../actions';
import StudentList from './studentlist';
import AddForm from './addForm';

class App extends Component {
    componentDidMount() {
        this.props.fetchAll();
    };

    average() {
        if (!this.props.list || this.props.list.students.length === 0) {
            return '0%';
        };
        let grades = this.props.list.students.map((student) => {
            return student.grade;
        });

        let total = grades.reduce((sum, value) => {
            return sum + value;
        });
        
        return `${Math.floor(total / grades.length)}%`;
    };

    render() {
        return (
            <div className='container'>
                {/* The top 'nav' */}
                <div className='row'>
                    <div className='mr-auto'>
                        <h1>Student Grade Table</h1>
                    </div>
                    <div className='ml-auto'>
                        <h3>Grade Average: <span className='badge badge-default'>{this.average()}</span></h3>
                    </div>
                </div>
                <hr/>
                <div className='row'>
                     <div className='col-md-3 col-12'>
                          <AddForm />  
                    </div> 
                     <div className='col-md-9 col-12'> 
                         <StudentList /> 
                    </div>
                </div>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {
        list: state.list.data
    };
};

export default connect(mapStateToProps, { fetchAll })(App);