import React from 'react';
import { withFormik } from 'formik';

import Debug from '../components/Debug';
// import Modal from '../components/Modal';
// import axios from '../mockAdapter';
import validationSchema from '../validationSchema';

const Form = ({ history, location, match, ...formikProps }) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = formikProps;

  return (
    <form onSubmit={handleSubmit}>
      <label>Email Address</label>
      <input
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        name="email"
      />
      {errors.email && touched.email && (
        <div className="error">{errors.email}</div>
      )}
      <label>Username</label>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
        name="username"
      />
      {errors.username && touched.username && (
        <div className="error">{errors.username}</div>
      )}
      <label>Password</label>
      <input
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        name="password"
      />
      {errors.password && touched.password && (
        <div className="error">{errors.password}</div>
      )}
      <button type="submit">Sign up</button>
      {formikProps.isSubmitting && <p className="spinner">Loading...</p>}
      <Debug data={formikProps} />
      {/* <Modal data={data} /> */}
    </form>
  );
};

export default withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    email: '',
    username: '',
    password: ''
  }),
  handleSubmit: async (values, actions) => {
    const { setSubmitting, resetForm, setErrors } = actions;
    try {
      // const response = await axios.post('/signup', values);
      setSubmitting(false);
      // setData({ message: response.data });
      resetForm();
    } catch (error) {
      const message = error.response.data;
      setSubmitting(false);
      setErrors({ email: message });
    }
  }
})(Form);
