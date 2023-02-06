import { createContext } from "react";

const AuthContext = createContext({
  logInToken: "",
  storeToken: ()=>{},
  removeToken:()=>{},

});
export default AuthContext;
