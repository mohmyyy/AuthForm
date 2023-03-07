import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';


import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext)
  console.log(ctx)
  const toShow =  ctx.isLoggedIn
  console.log(toShow)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          { !toShow && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          { toShow && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          { toShow && <li>
            <button onClick={ctx.logout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
