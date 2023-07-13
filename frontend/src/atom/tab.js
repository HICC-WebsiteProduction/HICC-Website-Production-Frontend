import { atom } from 'recoil';

export const tab = atom({
  key: 'tab',
  default: { manage: 0 },
});
