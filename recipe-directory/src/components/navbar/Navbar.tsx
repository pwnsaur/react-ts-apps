import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { Searchbar } from '../../components/index';

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <NavLink to='/' end className='brand'>
          <h1>on nom</h1>
        </NavLink>
        <Searchbar />
        <NavLink to='create'>Create Recipe</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
