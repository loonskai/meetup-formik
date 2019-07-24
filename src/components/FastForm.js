import React from 'react';
import { Formik, Form, FastField } from 'formik:old';

import ColorBorderField from './ColorBorderField';
import Debug from './Debug';
import validationSchema from '../validationSchema';

function FastForm() {
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };

  const customHandleSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={customHandleSubmit}
      render={props => (
        <div className="form-container">
          <Form>
            <h2>{'<FastField />'}</h2>
            <div className="field-group">
              <label>Email Address</label>
              <FastField
                type="text"
                name="email"
                component={ColorBorderField}
              />
            </div>
            <div className="field-group">
              <label>Username</label>
              <FastField
                type="text"
                name="username"
                component={ColorBorderField}
              />
            </div>
            <div className="field-group">
              <label>Password</label>
              <FastField
                type="password"
                name="password"
                component={ColorBorderField}
              />
            </div>
            <button type="submit">Sign up</button>
          </Form>
          <Debug data={props.values} />
        </div>
      )}
    />
  );
}

export default FastForm;
