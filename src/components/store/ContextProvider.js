import { useState } from "react";
import AuthContext from "./auth-context";


const ContextProvider = (props) => {
  const userLoginDetails = localStorage.getItem('logIn')
  const [token, setToken] = useState(userLoginDetails);

  const userIsLoggedIn = !!token

  const storeTokenHandler = (token) => {
    setToken(token);
    localStorage.setItem('logIn',token)
  };

  const removeTokenHandler = () => {
    setToken(null);
    localStorage.removeItem('logIn')
  };



  const cartObject = {
    token: token,
    isLoggedIn:userIsLoggedIn,
    login: storeTokenHandler,
    logout: removeTokenHandler,
  };

  return (
    <AuthContext.Provider value={cartObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
