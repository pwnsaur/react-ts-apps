import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Create, Home, Recipe, Search } from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='create' element={<Create />} />
          <Route path='search' element={<Search />} />
          <Route path='recipes/:id' element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
