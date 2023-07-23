import { atom } from 'recoil';

// 관리 탭에서 뒤로가기를 눌렀을 때 상태를 기억했으면 한다는 의견이 있어
// 로컬 스토리지를 활용하여 현재 인덱스를 기억하도록 설정
export const manageTab = atom({
  key: 'manageTab',
  default: 0,
  effects: [localStorageEffect('manageTab')],
});

export function localStorageEffect(key) {
  return ({ setSelf, onSet }) => {
    const savedData = localStorage.getItem(key);
    // setSelf: atom 값을 설정 혹은 재설정
    if (savedData != null) setSelf(JSON.parse(savedData));
    else {
      localStorage.removeItem(key);
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
