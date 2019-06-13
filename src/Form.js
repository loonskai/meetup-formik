import React from 'react';

function Form() {
  return (
    <form>
      <label>Email Address</label>
      <input type="email" name="email" required autoComplete="off" />
      <label>Username</label>
      <input type="text" name="username" required autoComplete="off" />
      <label>Password</label>
      <input type="password" name="password" required autoComplete="off" />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Form;
