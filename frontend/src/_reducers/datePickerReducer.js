import { SELECT_DATE } from '../_actions/types';

export default function datePickerReducer(state = {}, action) {
  switch (action.type) {
    case SELECT_DATE:
      return { ...state, selectedDay: action.payload };
    default:
      return { ...state, selectedDay: new Date() };
  }
}
