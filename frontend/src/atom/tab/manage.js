import { atom } from 'recoil';
import localStorageEffect from '../localStorageEffect';

// 관리 탭에서 뒤로가기를 눌렀을 때 상태를 기억했으면 한다는 의견이 있어
// 로컬 스토리지를 활용하여 현재 인덱스를 기억하도록 설정
export const manageTab = atom({
  key: 'manageTab',
  default: 0,
  effects: [localStorageEffect('manageTab')],
});
