import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const oldPasswordInputRef = useRef('');
  const newPasswordInputRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    const oldPassword = oldPasswordInputRef.current.value;
    const newPassword = newPasswordInputRef.current.value;

    props.onChangePasswordHandler(oldPassword, newPassword);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
