import React from 'react';

/** Renders information about a form's error message
 *
 * Props:
 * - error
 *
 * State:
 * - None
 *
 * {Login, SignUp} -> ErrorMessage
 */

//TODO: Map or loop in the error messages

function ErrorMessage({ error }) {
  return (
    <div className='ErrorMessage' style={{color: "red"}}>
      <p> Error: {error} </p>
    </div>
  );

}

export default ErrorMessage;