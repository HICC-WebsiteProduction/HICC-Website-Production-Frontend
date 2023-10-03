import { atom } from 'recoil';

// datepicker에서 날짜를 선택할 때를 위해 쓰임
export const endSelect = atom({
  key: 'endSelect',
  default: new Date(),
});
