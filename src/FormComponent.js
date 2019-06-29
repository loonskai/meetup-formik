import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import validate from './validate';
import validationSchema from './validationSchema';

function FormComponent() {
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm(initialValues);
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      // validate={validate}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ isSubmitting }) => (
        <Form>
          <label>Email Address</label>
          <Field type="email" name="email" autoComplete="off" />
          <ErrorMessage name="email" component="div" className="error" />
          <label>Username</label>
          <Field type="text" name="username" autoComplete="off" />
          <ErrorMessage name="username" component="div" className="error" />
          <label>Password</label>
          <Field type="password" name="password" autoComplete="off" />
          <ErrorMessage name="password" component="div" className="error" />
          <button type="submit">Sign up</button>
          {isSubmitting && <p className="spinner">Loading...</p>}
        </Form>
      )}
    />
  );
}

export default FormComponent;
