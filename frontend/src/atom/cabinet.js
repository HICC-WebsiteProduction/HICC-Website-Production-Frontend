import { atom, selector } from 'recoil';

// 사물함 저장소
export const cabinet = atom({
  key: 'cabinet',
  default: [],
});

// 사물함 모달 창의 인덱스
export const currentCabinetIndex = atom({
  key: 'currentCabinetIndex',
  default: -1,
});

// 사물함에 모달을 확장시켰음
// 사물함 리스트와 현재 인덱스의 변화를 받아 현재 누른 버튼의 모달을 켜줌
export const cabinetModal = selector({
  key: 'cabinetModal',

  get: ({ get }) => {
    const cabinetList = get(cabinet);
    const selectedIndex = get(currentCabinetIndex);

    return cabinetList.map((cabinet, index) => {
      return {
        ...cabinet,
        modalOpen: index === selectedIndex,
      };
    });
  },

  set: ({ set, get }, newValue) => {
    set(currentCabinetIndex, newValue - 1);
  },
});
