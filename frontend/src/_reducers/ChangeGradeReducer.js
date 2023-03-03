import { CHANGE_GRADE } from '../_actions/types';

export default function changeGradeReducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_GRADE:
      return { ...state, changeSuccess: action.payload };
    default:
      return state;
  }
}
