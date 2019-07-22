import React from 'react';
import { Formik, Form, FastField } from 'formik:old';

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
        <Form>
          <label>Email Address</label>
          <FastField type="text" name="email" />
          <label>Username</label>
          <FastField type="text" name="username" />
          <label>Password</label>
          <FastField type="password" name="password" />
          <button type="submit">Sign up</button>
        </Form>
      )}
    />
  );
}

export default FastForm;
