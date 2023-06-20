import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Calendar from './pages/Calendar';
import MyPage from './pages/MyPage';
import Manage from './pages/Manage';
import Myinfo from './pages/Myinfo';
import Noticeboard from './pages/Noticeboard';
import MemberDetail from './pages/MemberDetail';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/myinfo" element={<Myinfo />} />
        <Route path="/noticeboard" element={<Noticeboard />} />
        <Route
          path="/manage/memberDetail/:userNickname"
          element={<MemberDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
