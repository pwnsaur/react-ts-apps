import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Create, Home, Recipe, Search } from './pages';
import { Navbar, ThemeSelector } from './components';
import { useTheme } from './hooks/useTheme';

const App = () => {
  const { mode } = useTheme() || {};

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recipes/:id' element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
