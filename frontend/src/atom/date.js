import { atom } from 'recoil';

// datepicker에서 날짜를 선택할 때를 위해 쓰임
export const date = atom({
  key: 'date',
  default: new Date(),
});
