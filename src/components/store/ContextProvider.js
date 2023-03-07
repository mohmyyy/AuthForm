import { useState } from "react";
import AuthContext from "./auth-context";

const ContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token

  const storeTokenHandler = (token) => {
    setToken(token);
  };

  const removeTokenHandler = () => {
    setToken(null);
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
