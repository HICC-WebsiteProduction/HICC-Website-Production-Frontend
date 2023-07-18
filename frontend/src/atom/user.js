import { atom } from 'recoil';

// user 정보는 localStorage에 저장한다.
export const user = atom({
  key: 'user',
  default: {
    studentID: '',
    nickname: '',
    name: '',
    major: '',
    call: '',
    grade: '',
    accessToken: '',
  },
  effects: [localStorageEffect('user')],
});

export function localStorageEffect(key) {
  return ({ setSelf, onSet }) => {
    const savedData = localStorage.getItem(key);
    // setSelf: atom 값을 설정 혹은 재설정
    if (savedData != null) setSelf(JSON.parse(savedData));
    else {
      localStorage.removeItem(key);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }

    // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
    // setSelf에 의해서는 작동하지 않음
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}
