import { useAtom } from 'jotai';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ForgotPassword from '../pages/belum-login/ForgotPassword';
import ForgotSuccess from '../pages/belum-login/ForgotSuccess';

import Login from '../pages/belum-login/Login';
import Signup from '../pages/belum-login/Signup';
import Welcome from '../pages/belum-login/Welcome'
import Home from '../pages/sudah-login/Home';
import TaskDetail from '../pages/sudah-login/TaskDetail';
import { userDataAtom } from '../state/kumpulanAtom';

function UinTask() {
  const [user, setUser] = useAtom(userDataAtom)

  return (
    <div className="bg-hejo-muda w-screen h-screen font-inter">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            {/* <Route path='/' element={<Welcome />} /> */}
            <Route path='/' element={!user ? <Welcome /> : <Navigate to="/tasks" />} />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/tasks" />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/tasks" />}
            />
            <Route
              path='/lupapassword'
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
            />
            <Route
              path='/forgotsuccess'
              element={!user ? <ForgotSuccess /> : <Navigate to="/" />}
            />
            <Route
              path='/tasks'
              element={user ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path='/tasks/detail/:id'
              element={user ? <TaskDetail /> : <Navigate to="/" />}
              loader={({ params }) => {
                console.log(params.id)
              }}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default UinTask;
