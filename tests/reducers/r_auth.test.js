import AuthReducer from '../../src/reducers/r_auth';

test('should set default state', () => {
    const state = AuthReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: '12345'
    };
    const state = AuthReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should unset uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = AuthReducer({ uid: '12345' }, action);
    expect(state).toEqual({});
});