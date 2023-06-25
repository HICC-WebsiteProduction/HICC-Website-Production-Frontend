import { CHANGE_GRADE, INIT_MEMBER, DELETE_MEMBER } from './types';

export function changeGradeAction(data) {
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

export function deleteMember(data) {
  return {
    type: DELETE_MEMBER,
    payload: data,
  };
}
