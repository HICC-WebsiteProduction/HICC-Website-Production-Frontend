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
import PrivateRoute from './PrivateRoute';
import { useRecoilValue } from 'recoil';
import { user } from './atom/user';
import CurrentPost from './components/noticeboard/CurrentPost';
import Post from './components/noticeboard/Post';
import NewPost from './components/noticeboard/NewPost';

function Router() {
  const isLogin = useRecoilValue(user).accessToken;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/manage" element={<Manage />} />
        <Route
          path="/noticeboard"
          element={
            <PrivateRoute authenticated={isLogin} component={<Noticeboard />} />
          }
        />
        <Route path="/manage/memberinfo/:user" element={<MemberDetail />} />
        <Route path="/rent/umbrellarent" element={<UmbrellaRent />} />
        <Route path="/rent/cabinetrent" element={<CabinetRent />} />
        <Route path="/post/:id" element={<CurrentPost />} />
        <Route path="/newpost" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
