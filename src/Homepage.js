import './Homepage.css';
import React, { useContext } from 'react';
import userContext from "./userContext";
import { Link } from 'react-router-dom';

/** Homepage for "/"
 * If user is logged in, accesses context to display personalized message
 *
 * Props:
 * - None
 *
 * States:
 * - None
 *
 * RoutesList -> Homepage
 */

function Homepage() {
  const { userData } = useContext(userContext);

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {userData
      ?
       <h3 className='Homepage-welcome'>Welcome back, {userData.firstName}</h3>
      :
      <div className="Homepage-button">
        <Link to="/login"><button>Log in </button></Link>
        <Link to="/signup"><button>Sign up</button></Link>
      </div>
      }
    </div>
  );
}

export default Homepage;
