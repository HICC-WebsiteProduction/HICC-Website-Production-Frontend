import { currentLockerIndex, locker } from '../atom/locker';
import { currentUmbrellaIndex, umbrella } from './../atom/umbrella';

// 사물함과 우산 아톰을 반환해줌
export const applyType = {
  사물함: { item: locker, index: currentLockerIndex },
  우산: { item: umbrella, index: currentUmbrellaIndex },
};
