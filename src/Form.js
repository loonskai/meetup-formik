import React from 'react';

import useFormik from './useFormik';
import Debug from './Debug';

function Form() {
  const formik = useFormik({
    // first
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    // second. This function will be executed inside useFormik when run handleSubmit
    onSubmit: values => {
      console.log(values);
    },
    // third
    validate: values => {
      let errors = {};
      if (values.username !== 'admin') {
        errors.username = 'You are not allowed';
      }
      return errors;
    }
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
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
        className={errors.email && touched.email && 'input-error'}
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      <label>Username</label>
      <input
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        name="username"
        autoComplete="off"
        className={errors.username && touched.username && 'input-error'}
      />
      {errors.username && touched.username && (
        <p className="error">{errors.username}</p>
      )}
      <label>Password</label>
      <input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        name="password"
        autoComplete="off"
        className={errors.password && touched.password && 'input-error'}
      />
      {errors.password && touched.password && (
        <p className="error">{errors.password}</p>
      )}
      <Debug formik={formik} />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Form;
