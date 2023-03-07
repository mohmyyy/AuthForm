import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthContext from "./components/store/auth-context";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const authCtx = useContext(AuthContext);
  const toShow = authCtx.isLoggedIn;
  console.log(toShow);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!toShow && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {toShow && <UserProfile />}
          {!toShow && <Redirect to='/auth' />}
          </Route>

        <Route path="*">
          <Redirect to="/" />     
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
