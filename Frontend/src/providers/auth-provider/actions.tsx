import { createAction } from 'redux-actions';
import { IUser, IUserStateContext } from './context';

export enum UserActionEnums {
    loginUserPending = 'LOGIN_USER_PENDING',
    loginUserSuccess = 'LOGIN_USER_SUCCESS',
    loginUserError = 'LOGIN_USER_ERROR',
}

export const loginUserPending = createAction<IUserStateContext>(
    UserActionEnums.loginUserPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        }
    )
);

export const loginUserSuccess = createAction<IUserStateContext, IUser>(
    UserActionEnums.loginUserSuccess, (user: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            user,
        }
    )
);

export const loginUserError = createAction<IUserStateContext>(
    UserActionEnums.loginUserError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        }
    )
);