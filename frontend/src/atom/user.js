import { atom } from 'recoil';
import localStorageEffect from './localStorageEffect';

// user 정보는 localStorage에 저장한다.
// 이 정보들을 활용하여 페이지 접근, 권한 체크 등을 구현할 예정
export const user = atom({
  key: 'user',
  default: {
    nickname: '',
    name: '',
    id: '',
    phoneNumber: '',
    role: '',
    major: '',
    accessToken: '',
  },
  effects: [localStorageEffect('user')],
});
