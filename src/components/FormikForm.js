import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Debug from './Debug';
import Modal from './Modal';
import Spinner from './Spinner';
import axios from '../mockAdapter';
import validationSchema from '../validationSchema';

function FormikForm() {
  const [data, setData] = useState(null);
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };

  const customHandleSubmit = async (values, actions) => {
    const { setSubmitting, resetForm, setErrors } = actions;
    try {
      const response = await axios.post('/signup', values);
      setSubmitting(false);
      setData({ message: response.data });
      resetForm();
    } catch (error) {
      const message = error.response.data;
      setSubmitting(false);
      setErrors({ email: message });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={customHandleSubmit}
      render={props => (
        <div className="form-container">
          <Form>
            <div className="field-group">
              <label>Email Address</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="field-group">
              <label>Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="field-group">
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit">Sign up</button>
            <Modal data={data} />
            {props.isSubmitting && <Spinner />}
          </Form>
          <Debug data={props} />
        </div>
      )}
    />
  );
}

export default FormikForm;
