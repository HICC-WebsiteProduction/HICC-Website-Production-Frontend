import { CHANGE_GRADE } from './types';

export function changeGrade(data) {
  return {
    type: CHANGE_GRADE,
    payload: data,
  };
}
