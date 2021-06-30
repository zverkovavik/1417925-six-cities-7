import { ActionCreator } from './action';
import { AuthorizationStatus, ApiRoute, AppRoute } from '../constants';

export const fetchAdCardsList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({ data }) => dispatch(ActionCreator.loadAdCards(data)))
    .catch((response) => {
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

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
