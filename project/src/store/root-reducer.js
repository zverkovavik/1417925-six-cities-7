import { combineReducers } from 'redux';
import { user } from './user/user';
import { data } from './data/data';

export const NameSpace = {
  DATA: 'DATA',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});
