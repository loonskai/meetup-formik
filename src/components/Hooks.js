import React from 'react';
import { Formik, useField } from 'formik:unstable';

import MiniDebug from './MiniDebug';
import validationSchema from '../validationSchema';

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="field-group">
      <label>{label}</label>
      <input {...field} {...props} autoComplete="off" />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      <MiniDebug data={{ field, meta }} />
    </div>
  );
};

export default function Hooks() {
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
      render={props => (
        <div className="form-container">
          <form onSubmit={props.handleSubmit}>
            <MyTextField name="email" type="email" label="Email" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    />
  );
}
