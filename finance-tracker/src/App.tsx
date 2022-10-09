import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Home, Login, Signup } from './pages';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
