import { createAction } from 'redux-actions';
import { IUser, IAuthStateContext } from './context';

export enum UserActionEnums {
    loginUserPending = 'LOGIN_USER_PENDING',
    loginUserSuccess = 'LOGIN_USER_SUCCESS',
    loginUserError = 'LOGIN_USER_ERROR',
}

export const loginUserPending = createAction<IAuthStateContext>(
    UserActionEnums.loginUserPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const loginUserSuccess = createAction<IAuthStateContext, IUser>(
    UserActionEnums.loginUserSuccess, (user: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            user,
        }
    )
);

export const loginUserError = createAction<IAuthStateContext>(
    UserActionEnums.loginUserError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);