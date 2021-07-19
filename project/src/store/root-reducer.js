import { combineReducers } from 'redux';
import { user } from './user/user';
import { appData } from './app-data/app-data';

export const NameSpace = {
  DATA: 'DATA',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.USER]: user,
});
