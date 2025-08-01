'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    UserStateContext,
    UserActionContext,
    INITIAL_STATE,
    IUser
} from "./context";
import { UserReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    loginUserPending,
    loginUserSuccess,
    loginUserError
} from "./actions";
import { AbpTokenProperies, decodeToken } from "@/utils/jwt";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const userLogin = async (payload: IUser) => {
        dispatch(loginUserPending());
        const endpoint = `/TokenAuth/Authenticate`;
        await instance
            .post(endpoint, payload)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = decodeToken(token);
                const userRole = decoded[AbpTokenProperies.role];
                const userId = decoded[AbpTokenProperies.nameidentifier];

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", userRole);
                sessionStorage.setItem("userId", userId);

                dispatch(loginUserSuccess(token));
            })
            .catch((error) => {
                console.error(error);
                dispatch(loginUserError());
            });
    };
    return (
        <UserStateContext.Provider value={state}>
            <UserActionContext.Provider 
                value={{
                    userLogin
                }}
            >
                {children}
            </UserActionContext.Provider>
        </UserStateContext.Provider>
    )
}

export const useUserState = () => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
};

export const useUserActions = () => {
    const context = useContext(UserActionContext);
    if (!context) {
        throw new Error("useUserActions must be used within a UserProvider");
    }
    return context;
};