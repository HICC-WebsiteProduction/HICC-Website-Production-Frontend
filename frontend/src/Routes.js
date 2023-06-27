import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Calendar from './pages/Calendar';
import MyPage from './pages/MyPage';
import Manage from './pages/Manage';
import Noticeboard from './pages/Noticeboard';
import MemberDetail from './pages/MemberDetail';
import Login from './pages/Login';
import CabinetRent from './pages/CabinetRent';
import UmbrellaRent from './pages/UmbrellaRent';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/noticeboard" element={<Noticeboard />} />
        <Route
          path="/manage/memberDetail/:userNickname"
          element={<MemberDetail />}
        />
        <Route path="/rent/umbrellarent" element={<UmbrellaRent />} />
        <Route path="/rent/cabinetrent" element={<CabinetRent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
