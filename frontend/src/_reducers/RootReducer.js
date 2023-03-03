import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import changeGradeReducer from './ChangeGradeReducer';

const rootReducer = combineReducers({
  userReducer,
  changeGradeReducer,
});

export default rootReducer;
