import { cabinet, currentCabinetIndex } from './../atom/cabinet';
import { umbrella, currentUmbrellaIndex } from './../atom/umbrella';

// 사물함과 우산 아톰을 반환해줌
export const applyType = {
  사물함: { item: cabinet, index: currentCabinetIndex },
  우산: { item: umbrella, index: currentUmbrellaIndex },
};
