import React from 'react';

export default function Debug({ formik }) {
  const { values, errors, touched, isSubmitting } = formik;
  return (
    <div className="debugger">
      <p>Formik state</p>
      <div>
        <p>Values</p>
        {Object.keys(values).map(key => (
          <p key={key}>
            {key}: "{values[key]}"
          </p>
        ))}
      </div>
      <div>
        <p>Errors</p>
        {Object.keys(errors).map(key => (
          <p key={key}>
            {key}: "{errors[key]}"
          </p>
        ))}
      </div>
      <div>
        <p>Touched</p>
        {Object.keys(touched).map(key => (
          <p key={key}>
            {key}: "{touched[key]}"
          </p>
        ))}
      </div>
      <div>
        <p key="isSubmitted">isSubmitting: {isSubmitting.toString()}</p>
      </div>
    </div>
  );
}
