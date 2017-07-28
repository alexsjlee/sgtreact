import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import App from './components/app';
import StudentList from './components/studentlist';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
         <div>
            <App />
        </div> 
        {/* <Router>
            <div>
                <Route component={App} />
                <Route path='/' component={StudentList} />
            </div>
        </Router> */}
    </Provider>,
    document.getElementById('root')
);
