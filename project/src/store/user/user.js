import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../constants';
import { requireAuthorization, logoutApp, setEmail, setAvatarUrl } from '../action';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  login: '',
  avatarUrl: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.login = action.payload;
    })
    .addCase(setAvatarUrl, (state, action) => {
      state.avatarUrl = action.payload;
    })
    .addCase(logoutApp, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.login = '';
    });
});

export { user };
