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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label>Email Address</label>
          <input
            value={state.email}
            onChange={handleChange}
            type="email"
            name="email"
            autoComplete="off"
          />
        </div>
        <div className="field-group">
          <label>Username</label>
          <input
            value={state.username}
            onChange={handleChange}
            type="text"
            name="username"
            autoComplete="off"
          />
        </div>
        <div className="field-group">
          <label>Password</label>
          <input
            value={state.password}
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="off"
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <Debug data={state} />
    </div>
  );
}

export default CustomForm;
