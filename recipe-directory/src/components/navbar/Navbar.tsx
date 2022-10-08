import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { Searchbar } from '../';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { color } = useTheme() || {};

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <NavLink to='/' end className='brand'>
          <h1>om nom</h1>
        </NavLink>
        <Searchbar />
        <NavLink to='create'>Create Recipe</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
