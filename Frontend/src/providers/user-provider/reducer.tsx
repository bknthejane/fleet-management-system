import { handleActions } from "redux-actions";
import { INITIAL_STATE, IUserStateContext } from "./context";
import { UserActionEnums } from "./actions";

export const UserReducer = handleActions<IUserStateContext, IUserStateContext>(
    {
        [UserActionEnums.getUserListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.getUserListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.getUserListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.getUserPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.getUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.getUserError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.updateUserPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.updateUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.updateUserError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.deleteUserPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.deleteUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.deleteUserError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);