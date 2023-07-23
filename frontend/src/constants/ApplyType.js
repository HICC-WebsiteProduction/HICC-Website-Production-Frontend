import { cabinet, currentCabinetIndex } from './../atom/cabinet';
import { umbrella, currentUmbrellaIndex } from './../atom/umbrella';

export const applyType = {
  사물함: { item: cabinet, index: currentCabinetIndex },
  우산: { item: umbrella, index: currentUmbrellaIndex },
};
