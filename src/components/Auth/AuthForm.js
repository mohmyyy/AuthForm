import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const ctx = useContext(AuthContext)
  console.log(ctx)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log(enteredEmail, enteredPassword);
    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2RroineHJOuXSx4UjaorLmlxt6T9yyuQ",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log(data.idToken);
        ctx.storeToken(data.idToken)
        // ctx.logInToken(data.idToken)

      } catch (error) {
        console.log(error);
        alert(error)
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2RroineHJOuXSx4UjaorLmlxt6T9yyuQ",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button >
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* {request && <p>Sending Request...</p>} */}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
