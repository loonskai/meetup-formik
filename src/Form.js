import React, { useReducer } from 'react';

const initialState = {
  email: '',
  username: '',
  password: ''
};

function Form() {
  const [state, setState] = useReducer(
    (prevState, updatedValues) => ({ ...prevState, ...updatedValues }),
    initialState
  );

  const handleChange = ({ target: { name, value } }) =>
    setState({
      [name]: value
    });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

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
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Form;
