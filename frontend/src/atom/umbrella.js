import { atom, selector } from 'recoil';

export const umbrella = atom({
  key: 'umbrella',
  default: [],
});

export const currentUmbrellaIndex = atom({
  key: 'currentUmbrellaIndex',
  default: -1,
});

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
