import { atom } from 'recoil';

// 회원가입 진입 전에 약관동의를 받았는 지를 체크하는 기능
const agree = atom({
  key: 'agree',
  default: false,
});

export default agree;
