import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useRecoilValue } from 'recoil';
import { user } from './atom/user';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TOS from './pages/TOS';
import Calendar from './pages/Calendar';
import PrivateRoute from './permissionRoute/PrivateRoute';
import Mypage from './pages/MyPage';
import AdminRoute from './permissionRoute/AdminRoute';
import Manage from './pages/Manage';
import Noticeboard from './pages/Noticeboard';
import PresidentRoute from './permissionRoute/PresidentRoute';
import MemberDetail from './components/manage/MemberDetail';
import UndergraduateRoute from './permissionRoute/UndergraduateRoute';
import UmbrellaRent from './pages/UmbrellaRent';
import CabinetRent from './pages/CabinetRent';
import CurrentPost from './components/noticeboard/CurrentPost';

function App() {
  const isLogin = useRecoilValue(user).accessToken;
  const role = useRecoilValue(user).role;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tos" element={<TOS />} />
        <Route path="/schedule" element={<Calendar />} />
        <Route path="/post/:id" element={<CurrentPost />} />

        <Route
          path="/mypage"
          element={
            <PrivateRoute
              authenticated={isLogin}
              permission={role}
              component={<Mypage />}
            />
          }
        />
        <Route
          path="/manage"
          element={
            <AdminRoute
              authenticated={isLogin}
              permission={role}
              component={<Manage />}
            />
          }
        />
        <Route
          path="/noticeboard"
          element={
            <PrivateRoute
              authenticated={isLogin}
              permission={role}
              component={<Noticeboard />}
            />
          }
        />
        <Route
          path="/manage/memberinfo/:user"
          element={
            <PresidentRoute
              authenticated={isLogin}
              permission={role}
              component={<MemberDetail />}
            />
          }
        />
        <Route
          path="/rent/umbrellarent"
          element={
            <UndergraduateRoute
              authenticated={isLogin}
              permission={role}
              component={<UmbrellaRent />}
            />
          }
        />
        <Route
          path="/rent/cabinetrent"
          element={
            <UndergraduateRoute
              authenticated={isLogin}
              permission={role}
              component={<CabinetRent />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
