import { combineReducers } from 'redux';
import { user } from './user/user';
import { appData } from './app-data/app-data';
import { appLogic } from './app-logic/app-logic';

export const NameSpace = {
  DATA: 'DATA',
  LOGIC: 'LOGIC',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.LOGIC]: appLogic,
  [NameSpace.USER]: user,
});
