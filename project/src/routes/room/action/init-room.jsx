import { fetchApartmentsNear, fetchOneAdCard, fetchCommentsList } from '../../../store/api-actions';

export const initRoom = (id) => (dispatch, _getState, api) => {
  dispatch(fetchOneAdCard(id));
  dispatch(fetchApartmentsNear(id));
  dispatch(fetchCommentsList(id));
};
