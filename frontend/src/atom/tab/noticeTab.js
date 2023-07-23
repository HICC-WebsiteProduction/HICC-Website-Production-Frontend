import { atom } from 'recoil';

// 알림 내에서 탭 인덱스 값을 저장하는 저장소
export const noticeTab = atom({
  key: 'noticeTab',
  default: 0,
});
