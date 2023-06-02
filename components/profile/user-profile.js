//import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
//import { useSession, getSession } from 'next-auth/client';

async function changePassword(oldPassword, newPassword) {
  try {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword
      })
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.log(data.message);
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (err) {
    console.log(err);
  }
}

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then(session => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePasswordHandler={changePassword} />
    </section>
  );
}

export default UserProfile;
