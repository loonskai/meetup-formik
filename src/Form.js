import React from 'react';

import useFormik from './useFormik';
import Debug from './Debug';

function Form() {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  });

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors
  } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <label>Email Address</label>
      <input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        name="email"
        autoComplete="off"
      />
      <label>Username</label>
      <input
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        name="username"
        autoComplete="off"
      />
      <label>Password</label>
      <input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        name="password"
        autoComplete="off"
      />
      <Debug formik={formik} />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Form;
