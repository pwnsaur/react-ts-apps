import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Home, Login, Signup } from './pages';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={user && <Home />}></Route>
            <Route path='/login' element={!user && <Login />} />
            <Route path='/signup' element={!user && <Signup />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
