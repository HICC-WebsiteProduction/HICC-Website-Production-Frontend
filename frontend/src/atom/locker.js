import { atom } from 'recoil';

// 사물함 저장소
export const locker = atom({
  key: 'locker',
  default: [],
});
