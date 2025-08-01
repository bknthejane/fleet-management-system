import { handleActions } from "redux-actions";
import {INITIAL_STATE, IUserStateContext} from "./context";
import { UserActionEnums } from "./actions";

export const UserReducer = handleActions<IUserStateContext, IUserStateContext>(
    {
        [UserActionEnums.loginUserPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.loginUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [UserActionEnums.loginUserError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);