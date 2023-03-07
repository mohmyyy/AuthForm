import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLooding, setIsLooding] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const ctx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = async (event) => {
    setIsLooding(true);
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    console.log(enteredEmail, enteredPassword);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2RroineHJOuXSx4UjaorLmlxt6T9yyuQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2RroineHJOuXSx4UjaorLmlxt6T9yyuQ";
    }
    try {
      const response = await fetch(url, { 
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLooding(false);
      const data = await response.json();
      console.log(response.ok)
      if (!response.ok) {
        // console.log(response.json());
        // return response;
        throw new Error(data.error.message);
      }
      else{
        ctx.login(data.idToken);
        history.replace('/')
      }
      
    } catch (error) {
      console.log(error);
      alert(error);
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
          {!isLooding && (
            <button>
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLooding && <p>Sending Request</p>}
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
