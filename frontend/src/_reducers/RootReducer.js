import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import changeMemberInfoReducer from './ChangeMemberInfoReducer';

const rootReducer = combineReducers({
  userReducer,
  changeMemberInfoReducer,
});

export default rootReducer;
