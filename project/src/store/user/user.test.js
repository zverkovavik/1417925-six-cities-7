import { user } from './user';
import { AuthorizationStatus } from '../../constants';
import { ActionType } from '../action';

describe('Reducer: user', () => {

  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        login: '',
        avatarUrl: '',
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {

    const state = { authorizationStatus: AuthorizationStatus.UNKNOWN, login: '' };

    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({ authorizationStatus: AuthorizationStatus.NO_AUTH, login: '' });
  });

  it('should update authorizationStatus to "AUTH"', () => {

    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      login: '',
    };

    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({ authorizationStatus: AuthorizationStatus.AUTH, login: '' });
  });


  it('on logout should update authorizationStatus to "NO_AUTH"', () => {

    const state = { authorizationStatus: AuthorizationStatus.AUTH, login: 'larryPage@gmail.com' };

    const logoutAction = { type: ActionType.LOGOUT };

    expect(user(state, logoutAction))
      .toEqual({ authorizationStatus: AuthorizationStatus.NO_AUTH, login: '' });
  });

  it('should set user email', () => {
    const state = { authorizationStatus: AuthorizationStatus.AUTH, login: '' };
    const setEmailAction = {
      type: ActionType.SET_EMAIL,
      payload: 'larryPage@gmail.com',
    };

    expect(user(state, setEmailAction))
      .toEqual({ authorizationStatus: AuthorizationStatus.AUTH, login: 'larryPage@gmail.com' });
  });

});
