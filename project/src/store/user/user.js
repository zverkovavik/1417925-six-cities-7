import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../constants';
import { requireAuthorization, logoutApp, setEmail, setActiveCard, resetActiveCard } from '../action';

const EMPTY_ACTIVE_CARD = 0;

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  login: '',
  activeCardId: EMPTY_ACTIVE_CARD,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setActiveCard, (state, action) => {
      state.activeCardId = action.payload;
    })
    .addCase(resetActiveCard, (state) => {
      state.activeCardId = EMPTY_ACTIVE_CARD;
    })
    .addCase(setEmail, (state, action) => {
      state.login = action.payload;
    })
    .addCase(logoutApp, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    });
});

export { user };
