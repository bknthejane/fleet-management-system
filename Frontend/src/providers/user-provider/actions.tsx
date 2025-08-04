import { createAction } from "redux-actions";
import { IUser, IUserStateContext } from "./context";

export enum UserActionEnums {
    getUserListPending = 'GET_USER_LIST_PENDING',
    getUserListSuccess = 'GET_USER_LIST_SUCCESS',
    getUserListError = 'GET_USER_LIST_ERROR',

    getUserPending = 'GET_USER_PENDING',
    getUserSuccess = 'GET_USER_SUCCESS',
    getUserError = 'GET_USER_ERROR',

    updateUserPending = 'UPDATE_USER_PENDING',
    updateUserSuccess = 'UPDATE_USER_SUCCESS',
    updateUserError = 'UPDATE_USER_ERROR',

    deleteUserPending = 'DELETE_USER_PENDING',
    deleteUserSuccess = 'DELETE_USER_SUCCESS',
    deleteUserError = 'DELETE_USER_ERROR',
}

export const getUserListPending = createAction<IUserStateContext>(
    UserActionEnums.getUserListPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        })
);

export const getUserListSuccess = createAction<IUserStateContext, IUser[]>(
    UserActionEnums.getUserListSuccess, (users: IUser[]) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            users,
        })
);

export const getUserListError = createAction<IUserStateContext>(
    UserActionEnums.getUserListError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        })
);

export const getUserPending = createAction<IUserStateContext>(
    UserActionEnums.getUserPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        })
);

export const getUserSuccess = createAction<IUserStateContext, IUser>(
    UserActionEnums.getUserSuccess, (User: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            User,
        })
);

export const getUserError = createAction<IUserStateContext>(
    UserActionEnums.getUserError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        })
);

export const updateUserPending = createAction<IUserStateContext>(
    UserActionEnums.updateUserPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        })
);

export const updateUserSuccess = createAction<IUserStateContext, IUser>(
    UserActionEnums.updateUserSuccess, (User: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            User,
        })
);

export const updateUserError = createAction<IUserStateContext>(
    UserActionEnums.updateUserError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        })
);

export const deleteUserPending = createAction<IUserStateContext>(
    UserActionEnums.deleteUserPending, () => (
        {
            isPending: true,
            isSuccess: false,
            isError: false,
        })
);

export const deleteUserSuccess = createAction<IUserStateContext, IUser>(
    UserActionEnums.deleteUserSuccess, (User: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            User,
        })
);

export const deleteUserError = createAction<IUserStateContext>(
    UserActionEnums.deleteUserError, () => (
        {
            isPending: false,
            isSuccess: false,
            isError: true,
        })
);

