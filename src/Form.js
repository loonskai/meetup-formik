import React, { useReducer } from 'react';
import { SET_FIELD_VALUE } from './constants';

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
  const handleChange = event => {
    event.persist();
    const {
      target: { name, value }
    } = event;
    dispatch({
      type: SET_FIELD_VALUE,
      payload: {
        [name]: value
      }
    });
  };

  /*  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  }; */

  return {
    handleChange,
    state
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
  const { handleSubmit, handleChange, ...state } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <label>Email Address</label>
      <input
        value={state.email}
        onChange={handleChange}
        type="email"
        name="email"
        autoComplete="off"
      />
      <label>Username</label>
      <input
        value={state.username}
        onChange={handleChange}
        type="text"
        name="username"
        autoComplete="off"
      />
      <label>Password</label>
      <input
        value={state.password}
        onChange={handleChange}
        type="password"
        name="password"
        autoComplete="off"
      />
      <div className="debugger">
        {Object.keys(state.state.values).map(key => (
          <p key={key}>
            {key}: "{state.state.values[key]}"
          </p>
        ))}
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Form;
