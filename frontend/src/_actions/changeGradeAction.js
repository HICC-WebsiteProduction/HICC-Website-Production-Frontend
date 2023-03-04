import { CHANGE_GRADE, INIT_MEMBER } from './types';

export function changeGrade(data) {
  return {
    type: CHANGE_GRADE,
    payload: data,
  };
}

export function initMember(data) {
  return {
    type: INIT_MEMBER,
    payload: data,
  };
}
