import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { ActionType } from './action';
import { ApiRoute, AuthorizationStatus, AppRoute } from '../constants';
import {
  fetchAdCardsList,
  fetchOneAdCard,
  fetchApartmentsNear,
  fetchFavoriteList,
  changeFavoriteList,
  fetchCommentsList,
  checkAuth,
  login,
  logout
} from './api-actions';

let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@test.ru', password: '123456', 'avatar_url': 'img.png'};
    const adaptedfakeUser = { avatarUrl: 'img.png'};
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ApiRoute.LOGIN)
      .reply(200, fakeUser);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_EMAIL,
          payload: fakeUser.email,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_AVATAR_URL,
          payload: adaptedfakeUser.avatarUrl,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@test.ru', password: '123456', 'avatar_url': 'img.png'};
    const loginLoader = login(fakeUser);
    const adaptedfakeUser = { avatarUrl: 'img.png'};
    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, fakeUser);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_EMAIL,
          payload: fakeUser.email,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_AVATAR_URL,
          payload: adaptedfakeUser.avatarUrl,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
      });
  });

  it('should make a correct API call to GET /hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const cardsLoader = fetchAdCardsList();

    apiMock
      .onGet(ApiRoute.HOTELS)
      .reply(200, [{fake: true}]);

    return cardsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AD_CARDS,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to GET /hotels/id_card', () => {
    const apiMock = new MockAdapter(api);
    const fakeCardId = 12;
    const dispatch = jest.fn();
    const cardLoader = fetchOneAdCard(fakeCardId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${fakeCardId}`)
      .reply(200, {fake: true});

    return cardLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_ONE_CARD,
          payload: {fake: true},
        });

      });
  });

  it('should make a correct API call to GET /hotels/id_card/apartmentsNearBy', () => {
    const apiMock = new MockAdapter(api);
    const fakeCardId = 12;
    const dispatch = jest.fn();
    const apartmentsNearLoader = fetchApartmentsNear(fakeCardId);

    apiMock
      .onGet(`${ApiRoute.HOTELS}/${fakeCardId}/nearby`)
      .reply(200, {fake: true});

    return apartmentsNearLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_APARTMENTS_NEAR,
          payload: {fake: true},
        });

      });
  });

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavoriteList();

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_LIST,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to POST /favorite /new favorite status', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeCardId = 12;
    const fakeStatus = 1;
    const favoritesChangeLoader = changeFavoriteList(fakeCardId, fakeStatus);

    apiMock
      .onPost(`${ApiRoute.FAVORITE}/${fakeCardId}/${fakeStatus}`)
      .reply(200, [{fake: true}]);

    return favoritesChangeLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FAVORITE_LIST,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to GET /comments/ : hotel_id', () => {
    const apiMock = new MockAdapter(api);
    const fakeCardId = 12;

    const dispatch = jest.fn();
    const commentsLoader = fetchCommentsList(fakeCardId);

    apiMock
      .onGet(`${ApiRoute.COMMENTS}/${fakeCardId}`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(ApiRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({type: ActionType.LOGOUT});
      });
  });
});
