import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <NavLink to='/' end>
            CASH MONEYY
          </NavLink>
        </li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>Signup</NavLink>
        </li>
        <li>
          <button className='btn' onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
