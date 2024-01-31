import React from 'react';
import SignUpForm from './SignUpForm.js';

/** SignUp page that renders a form for a user to register
 *
 * Props:
 *  - register()
 *
 * State:
 *  - None
 *
 * { RoutesList, NavBar } -> SignUp -> SignUpForm
*/

function SignUp({ register }) {
  return(
    <div className='SignUpPage'>
      <h1> Sign Up</h1>
      <SignUpForm register={register}/>
    </div>
  )
}

export default SignUp;