import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

// pages & components
import Home from '../pages/WorkoutHome'
import Login from '../pages/WorkoutLogin'
import Signup from '../pages/WorkoutSignup'
import WorkoutNavbar from '../components/WorkoutNavbar'

function WorkoutApp() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <WorkoutNavbar />
        <div className="pages">
          <Routes>
            <Route
              path="/workoutapp"
              element={user ? <Home /> : <Navigate to="/workoutapp/login" />}
            />
            <Route
              path="/workoutapp/login"
              element={!user ? <Login /> : <Navigate to="/workoutapp" />}
            />
            <Route
              path="/workoutapp/signup"
              element={!user ? <Signup /> : <Navigate to="/workoutapp" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default WorkoutApp;
