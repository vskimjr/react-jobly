import { React, useState } from "react";

/** Generic Edit Profile Form
 *
 * Props:
 *  - editProfile(): accepts profileData -> function to call in parent
 *  - user: data about current logged-in user
 *
 * State:
 *  - profileData: the form data retrieved from a user's inputs
 *
 *  Profile -> ProfileEditForm
*/

function ProfileEditForm({ user, editProfile }) {
  console.log("ProfileEditForm reached");

  const [profileData, setProfileData] = useState(
    {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
  });

  console.log("ProfileEditForm's profileData is currently:", profileData);

  /** Updates form input based on profile data*/
  function handleChange(evt) {
    setProfileData(() => evt.target.value);
  };

  /** Calls parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    editProfile(profileData);
    setProfileData({});
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label> Username </label>
      <input disabled value={profileData.username} onChange={handleChange} />
      <label> First name </label>
      <input value={profileData.firstName} onChange={handleChange} />
      <label> Last name </label>
      <input value={profileData.lastName} onChange={handleChange}/>
      <label> Email </label>
      <input value={profileData.email} onChange={handleChange}/>
      <button>Save Changes</button>
    </form>
  );
}

export default ProfileEditForm;