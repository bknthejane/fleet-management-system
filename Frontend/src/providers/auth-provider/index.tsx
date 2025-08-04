'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    AuthStateContext,
    AuthActionContext,
    INITIAL_STATE,
    IUser
} from "./context";
import { AuthReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    loginUserPending,
    loginUserSuccess,
    loginUserError
} from "./actions";
import { AbpTokenProperies, decodeToken } from "@/utils/jwt";
import { useUserActions } from "../user-provider";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const instance = getAxiosInstance();
    const { getUser } = useUserActions();

    const userLogin = async (payload: IUser) => {
        dispatch(loginUserPending());
        const endpoint = `/TokenAuth/Authenticate`;
        await instance
            .post(endpoint, payload)
            .then(async(response) => {
                const token = response.data.result.accessToken;
                const decoded = decodeToken(token);
                const userRole = decoded[AbpTokenProperies.role];
                const userId = decoded[AbpTokenProperies.nameidentifier];

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", userRole);
                sessionStorage.setItem("userId", userId);
                
                await getUser(userId);
                dispatch(loginUserSuccess(token));
            })
            .catch((error) => {
                console.error(error);
                dispatch(loginUserError());
            });
    };
    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionContext.Provider 
                value={{
                    userLogin
                }}
            >
                {children}
            </AuthActionContext.Provider>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
};

export const useAuthActions = () => {
    const context = useContext(AuthActionContext);
    if (!context) {
        throw new Error("useUserActions must be used within a UserProvider");
    }
    return context;
};