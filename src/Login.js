import React from 'react';
import LoginForm from "./LoginForm.js";

/** Login page that renders a form for a User to login
 *
 * Props:
 *  - login()
 *
 * State:
 *  - None
 *
 * { RoutesList, NavBar } -> Login -> LoginForm
*/

function Login({ login }) {
  return(
    <div className='LoginPage'>
      <h1> Log In</h1>
      <LoginForm login={login}/>
    </div>
  )
}

export default Login;