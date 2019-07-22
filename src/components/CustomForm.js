import React, { useReducer } from 'react';

import Debug from './Debug';

function CustomForm() {
  const initState = { email: '', username: '', password: '' };

  const [state, setState] = useReducer(
    (prevState, updates) => ({ ...prevState, ...updates }),
    initState
  );

  const handleChange = e => setState({ [e.target.name]: e.target.value });

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
      <Debug data={state} />
    </form>
  );
}

export default CustomForm;
