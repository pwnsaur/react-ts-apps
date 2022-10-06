import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <NavLink to='/' end className='brand'>
          <h1>on nom</h1>
        </NavLink>
        <NavLink to='create'>Create Recipe</NavLink>
        {/* <NavLink to='search'>Search</NavLink>
        <NavLink to='recipes/:id'>Recipes</NavLink> */}
      </nav>
    </div>
  );
};

export default Navbar;
