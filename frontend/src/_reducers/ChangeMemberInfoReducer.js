import { CHANGE_GRADE, INIT_MEMBER, DELETE_MEMBER } from '../_actions/types';

export default function changeMemberInfoReducer(state = {}, action) {
  switch (action.type) {
    case INIT_MEMBER:
      return { ...state, init: action.payload };
    case CHANGE_GRADE:
      return { ...state, changeSuccess: action.payload };
    case DELETE_MEMBER:
      return { ...state, deleteSuccess: action.payload };
    default:
      return { ...state };
  }
}
