import { ActionCreator } from './action';
import { AuthorizationStatus, ApiRoute } from '../constants';

export const fetchAdCardsList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.HOTELS)
    .then(({ data }) => dispatch(ActionCreator.loadAdCards(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    // проверить ТЗ нужно ли обрабатывать как-то зареджекшенный запрос
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);
