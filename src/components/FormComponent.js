import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import axios from '../mockAdapter';
import validationSchema from '../validationSchema';

function FormComponent() {
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
      alert(response.data);
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
      render={({ isSubmitting }) => (
        <Form>
          <label>Email Address</label>
          <Field type="text" name="email" />
          <ErrorMessage name="email" component="div" className="error" />
          <label>Username</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" className="error" />
          <label>Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className="error" />
          <button type="submit">Sign up</button>
          {isSubmitting && <p className="spinner">Loading...</p>}
        </Form>
      )}
    />
  );
}

export default FormComponent;
