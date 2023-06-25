import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import changeMemberInfoReducer from './ChangeMemberInfoReducer';
import datePickerReducer from './datePickerReducer';

const rootReducer = combineReducers({
  userReducer,
  changeMemberInfoReducer,
  datePickerReducer,
});

export default rootReducer;
