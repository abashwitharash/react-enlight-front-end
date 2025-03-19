import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import EnlightList from './components/EnlightList/EnlightList';
import * as enlightService from './services/enlightService';
import EnlightDetails from './components/EnlightDetails/EnlightDetails';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [enlights, setEnlights] = useState([]);

  useEffect(() => {
    const fetchAllEnlights = async () => {
      const enlightsData = await enlightService.index();

      // update to set state:
      setEnlights(enlightsData);
    };
    if (user) fetchAllEnlights();
  }, [user]);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/enlights' element={<EnlightList enlights={enlights} />} />
            <Route 
              path='/enlights/:enlightId'
              element={<EnlightDetails />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
