import { useRef } from 'react';

import classes from './profile-form.module.css';

function ProfileForm(props) {
  const oldPwRef = useRef();
  const newPwRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const oldPassword = oldPwRef.current.value;
    const newPassword = newPwRef.current.value;

    props.onChangePassword({
      oldPassword,
      newPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPwRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPwRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
