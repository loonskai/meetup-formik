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

  const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
    /*     setTimeout(() => {
      if (values.email === 'admin@mail.com') {
        setSubmitting(false);
        setErrors({ email: 'Email already in use' });
      } else {
        setSubmitting(false);
        resetForm(initialValues);
        console.log(JSON.stringify(values, null, 2));
      }
    }, 1000); */
    axios.post('/signup', values).then(response => {
      console.log(response);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
