import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state) =>  state[NameSpace.USER].authorizationStatus;

export const getLogin = (state) =>  state[NameSpace.USER].login;

