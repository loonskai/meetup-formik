import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function FormComponent() {
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
        </Form>
      )}
    </Formik>
  );
}

export default FormComponent;
