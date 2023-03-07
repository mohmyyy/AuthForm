import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import { Ref, useContext, useRef } from "react";
import AuthContext from "../store/auth-context";
const ProfileForm = () => {
  const auth = useContext(AuthContext);
  const newPasswordRef = useRef();
  const changePasswordHandler = async (event) => {
    event.preventDefault();
    console.log('Hello')
    const newPassword = newPasswordRef.current.value;
    try{
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2RroineHJOuXSx4UjaorLmlxt6T9yyuQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: auth.token,
            password: newPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      const data = await response.json();
      if(response.status === 400){
        throw new Error(data.error.message)
      }
    }
    catch(error){
      alert(error)
    }
  };
  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          ref={newPasswordRef}
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
