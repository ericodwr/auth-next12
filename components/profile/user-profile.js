import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/client';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile(props) {
  // const [loading, setLoading] = useState(true);
  // const [session, setSession] = useState(undefined);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // Redirect away if NOT auth
  // const [session, loading] = useSession();

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/users/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
