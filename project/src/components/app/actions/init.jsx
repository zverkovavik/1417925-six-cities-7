import { checkAuth, fetchAdCardsList } from '../../../store/api-actions';

export const init = () => (dispatch, _getState, api) => {
  dispatch(checkAuth());
  dispatch(fetchAdCardsList());
};
