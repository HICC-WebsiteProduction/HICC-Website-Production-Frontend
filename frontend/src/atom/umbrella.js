import { atom, selector } from 'recoil';

// 우산 저장소
export const umbrella = atom({
  key: 'umbrella',
  default: [],
});

// 우산 모달 창의 인덱스
export const currentUmbrellaIndex = atom({
  key: 'currentUmbrellaIndex',
  default: -1,
});

// 우산에 모달을 확장시켰음
// 우산 리스트와 현재 인덱스의 변화를 받아 현재 누른 버튼의 모달을 켜줌
export const umbrellaModal = selector({
  key: 'umbrellaModal',

  get: ({ get }) => {
    const umbrellaList = get(umbrella);
    const selectedIndex = get(currentUmbrellaIndex);

    return umbrellaList.map((umbrella, index) => {
      return {
        ...umbrella,
        modalOpen: index === selectedIndex,
      };
    });
  },

  set: ({ set, get }, newValue) => {
    set(currentUmbrellaIndex, newValue - 1);
  },
});
