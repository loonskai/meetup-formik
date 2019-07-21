import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FormikForm from './components/FormikForm';
import CustomForm from './components/CustomForm';
import './index.css';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={FormikForm} />
    <Route path="/custom" component={CustomForm} />
  </Router>,
  document.getElementById('root')
);
