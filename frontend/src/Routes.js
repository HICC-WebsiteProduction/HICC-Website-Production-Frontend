import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Calendar from './pages/Calendar';
import MyPage from './pages/MyPage';
import Manage from './pages/Manage';
import Noticeboard from './pages/Noticeboard';
import MemberDetail from './components/manage/MemberDetail';
import Login from './pages/Login';
import CabinetRent from './pages/CabinetRent';
import UmbrellaRent from './pages/UmbrellaRent';
import PrivateRoute from './permissionRoute/PrivateRoute';
import { useRecoilValue } from 'recoil';
import { user } from './atom/user';
import TOS from './pages/TOS';
import AdminRoute from './permissionRoute/AdminRoute';
import PresidentRoute from './permissionRoute/PresidentRoute';
import UndergraduateRoute from './permissionRoute/AdminRoute';

function Router() {
  const isLogin = useRecoilValue(user).accessToken;
  const role = useRecoilValue(user).role;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tos" element={<TOS />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute
              authenticated={isLogin}
              permission={role}
              component={<MyPage />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
