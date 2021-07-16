import { setEmail, loadAdCards, loadOneCard, loadApartmentsNear, loadFavoriteList, loadReviews, redirectToRoute, requireAuthorization, logoutApp, updateFavoriteList } from './action';
import { AuthorizationStatus, ApiRoute, AppRoute } from '../constants';

export const fetchAdCardsList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({ data }) => dispatch(loadAdCards(data)))
    .catch(() =>dispatch(loadAdCards([])))
);

export const fetchOneAdCard = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.HOTELS}/${id}`)
    .then(({ data }) => dispatch(loadOneCard(data)))
    .catch(() => {
      dispatch(redirectToRoute(AppRoute.NOT_FOUND));
    })
);

export const fetchApartmentsNear = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.HOTELS}/${id}/nearby`)
    .then(({ data }) => dispatch(loadApartmentsNear(data)))
);

export const fetchFavoriteList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({ data }) => dispatch(loadFavoriteList(data)))
);

export const changeFavoriteList = (id, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITE}/${id}/${status}`)
    .then(({ data }) => dispatch(updateFavoriteList(data)))
    .catch((response) => {
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const fetchCommentsList = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.COMMENTS}/${id}`)
    .then(({ data }) => dispatch(loadReviews(data)))
);

export const postComment = (id, {comment, rating}) => (dispatch, _getState, api) =>
  api.post(`${ApiRoute.COMMENTS}/${id}`, {comment, rating});

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({ data }) => dispatch(setEmail(data.email)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(setEmail(data.email));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(logoutApp()))
);
