import { ActionCreator } from './action';
import { AuthorizationStatus, ApiRoute, AppRoute } from '../constants';

export const fetchAdCardsList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({ data }) => dispatch(ActionCreator.loadAdCards(data)))
    .catch((response) => {
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const fetchOneAdCard = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.HOTELS}/${id}`)
    .then(({ data }) => dispatch(ActionCreator.loadOneCard(data)))
    .catch(() => {
      dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND));
    })
);

export const fetchApartmentsNear = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.HOTELS}/${id}/nearby`)
    .then(({ data }) => dispatch(ActionCreator.loadApartmentsNear(data)))
);

export const fetchFavoriteList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({ data }) => dispatch(ActionCreator.loadFavoriteList(data)))
    .catch((response) => {
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const changeFavoriteList = () => (dispatch, _getState, api) => (
  // реализован частично
  // POST /favorite/: hotel_id/: status
  api.post(ApiRoute.FAVORITE)
    .then(({ data }) => dispatch(ActionCreator.changeFavoriteList(data)))
    .catch((response) => {
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const fetchCommentsList = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.COMMENTS}/${id}`)
    .then(({ data }) => dispatch(ActionCreator.loadReviews(data)))
);

export const postComment = (id, {comment, rating}) => (dispatch, _getState, api) =>
  api.post(`${ApiRoute.COMMENTS}/${id}`, {comment, rating});

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({ data }) => dispatch(ActionCreator.setEmail(data.email)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    // проверить ТЗ нужно ли обрабатывать как-то зареджекшенный запрос
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(ActionCreator.setEmail(data.email));
    })
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);
