import { useState } from "react";
import AuthContext from "./auth-context";

const ContextProvider = (props) => {
  const [loginToken, setLoginToken] = useState("");

  const storeTokenHandler = (idToken) => {
    setLoginToken(() => {
      return idToken;
    });
  };

  const removeTokenHandler = () => {
    setLoginToken(() => "");
  };

  const cartObject = {
    logInToken: loginToken,
    storeToken: storeTokenHandler,
    removeToken: removeTokenHandler,
  };
  console.log(cartObject.logInToken);

  return (
    <AuthContext.Provider value={cartObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
