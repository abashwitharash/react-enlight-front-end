import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import EnlightList from './components/EnlightList/EnlightList';
import * as enlightService from './services/enlightService';
import EnlightDetails from './components/EnlightDetails/EnlightDetails';
import EnlightForm from './components/EnlightForm/EnlightForm';
import CommentForm from './components/CommentForm/CommentForm';

import { UserContext } from './contexts/UserContext';

const App = () => {

  const [enlights, setEnlights] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEnlights = async () => {
      const enlightsData = await enlightService.index();

      // update to set state:
      setEnlights(enlightsData);
    };
    if (user) fetchAllEnlights();
  }, [user]);

  const handleAddEnlight = async (enlightFormData) => {
    const newEnlight = await enlightService.create(enlightFormData);
    setEnlights([newEnlight, ...enlights]);
    navigate('/enlights');
  };

  const handleDeleteEnlight = async (enlightId) => {
    const deletedEnlight = await enlightService.deleteEnlight(enlightId);
    setEnlights(enlights.filter((enlight) => enlight._id !== enlightId));
    navigate('/enlights');
  };

  const handleUpdateEnlight = async (enlightId, enlightFormData) => {
    const updatedEnlight = await enlightService.update(enlightId, enlightFormData);
    setEnlights(enlights.map((enlight) => (enlightId === enlight._id ? updatedEnlight : enlight)));
    navigate(`/enlights/${enlightId}`);
  };
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/enlights' element={<EnlightList enlights={enlights} />} />
            <Route
              path='/enlights/:enlightId'
              element={<EnlightDetails handleDeleteEnlight={handleDeleteEnlight} />}
            />
            <Route path='/enlights/new'
              element={<EnlightForm handleAddEnlight={handleAddEnlight} />}
            />
            <Route
              path='/enlights/:enlightId/edit'
              element={<EnlightForm handleUpdateEnlight={handleUpdateEnlight} />}
            />
            <Route
              path='/enlights/:enlightId/comments/:commentId/edit'
              element={<CommentForm />}
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
