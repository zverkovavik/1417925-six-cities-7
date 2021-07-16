import { createReducer } from '@reduxjs/toolkit';
import { setActiveCard, resetActiveCard } from '../action';

const EMPTY_ACTIVE_CARD = 0;

const initialState = {
  activeCardId: EMPTY_ACTIVE_CARD,
};

const appLogic = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCard, (state, action) => {
      state.activeCardId = action.payload;
    })
    .addCase(resetActiveCard, (state) => {
      state.activeCardId = EMPTY_ACTIVE_CARD;
    });
});

export { appLogic };
