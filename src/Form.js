import React, { useReducer } from 'react';
import { SET_FIELD_VALUE, SET_FIELD_TOUCHED } from './constants';

function reducer(state, { type, payload }) {
  switch (type) {
    case SET_FIELD_VALUE:
      return {
        ...state, // contains errors and touched
        values: {
          ...state.values,
          ...payload
        }
      };
    case SET_FIELD_TOUCHED:
      return {
        ...state, // contains errors and values
        touched: {
          ...state.touched,
          ...payload
        }
      };
    default:
      return state;
  }
}

function useFormik({ initialValues }) {
  // As our useFormik internal state is complex object with some nested properties we'll use useReducer hook instead of useState. Another point is that in more complex form it's much easier to handle all the inputs using reducer concept
  // Formik uses name attribute of inputs as the way to access symmetrical aspects of useFormik state: values.name, errors.name, touched.name. That's pretty scalable
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: {},
    touched: {}
  });

  // When we run handleChange from our component it's gonna run dispatch SET_FIELD_VALUE
  const handleChange = e => {
    e.persist();
    dispatch({
      type: SET_FIELD_VALUE,
      payload: {
        [e.target.name]: e.target.value
      }
    });
  };

  // When we run handleBlur from our component it's gonna run dispatch SET_FIELD_TOUCHED
  const handleBlur = e => {
    e.persist();
    dispatch({
      type: SET_FIELD_TOUCHED,
      payload: {
        [e.target.name]: true
      }
    });
  };

  /*  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  }; */

  return {
    handleChange,
    handleBlur,
    ...state // we get values, touched, errors in our component
  };
}

function Form() {
  const options = {
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  };
  const formik = useFormik(options);
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
      {/* DEBBUGER WINDOW */}
      <p className="debugger">
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
      </p>
      {/* DEBBUGER WINDOW  */}
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Form;
