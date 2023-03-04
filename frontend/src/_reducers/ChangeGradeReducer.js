import { CHANGE_GRADE, INIT_MEMBER } from '../_actions/types';

export default function changeGradeReducer(state = {}, action) {
  switch (action.type) {
    case INIT_MEMBER:
      return { ...state, init: action.payload };
    case CHANGE_GRADE:
      return { ...state, changeSuccess: action.payload };
    default:
      return { ...state };
  }
}
