import { handleActions } from "redux-actions";
import {INITIAL_STATE, IAuthStateContext} from "./context";
import { UserActionEnums } from "./actions";

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
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