import { NameSpace } from '../root-reducer';

export const getActiveCardId = (state) =>  state[NameSpace.LOGIC].activeCardId;
