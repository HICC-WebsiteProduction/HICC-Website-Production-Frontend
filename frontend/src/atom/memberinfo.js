import { atom } from 'recoil';

/*
memberinfo 아톰 배열구조
{
  nickname: string,
  name: string,
  studentID: string,
  call: string,
  grade: string
}
*/
export const memberinfo = atom({
  key: 'memberinfo',
  default: [],
});
