import { atom, selector } from 'recoil';

export const cabinet = atom({
  key: 'cabinet',
  default: [],
});

export const currentCabinetIndex = atom({
  key: 'currentCabinetIndex',
  default: -1,
});

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
