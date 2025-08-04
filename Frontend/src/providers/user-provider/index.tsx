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
    getUserListPending,
    getUserListSuccess,
    getUserListError,
    getUserPending,
    getUserSuccess,
    getUserError,
    updateUserPending,
    updateUserSuccess,
    updateUserError,
    deleteUserPending,
    deleteUserSuccess,
    deleteUserError,
} from "./actions";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getUserList = async () => {
        dispatch(getUserListPending());
        const endpoint = `/services/app/User/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getUserListSuccess(response.data.result.items));
                console.log("Municipality name: ",response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getUserListError());
            });
    };



    const getUser = async (id: string) => {
        dispatch(getUserPending());
        const endpoint = `/services/app/User/Get?Id=${id}`;
        await instance
            .get(endpoint)
            .then((response) => {
                const result = response.data.result.municipalityName;
                const municipalityName = result || "";
                sessionStorage.setItem("municipalityName", municipalityName);

                const result2 = response.data.result.municipalityId;
                const municipalityId = result2 || "";
                sessionStorage.setItem("municipalityId", municipalityId)

                const result3 = response.data.result.name;
                const loggedInUser = result3 || "";
                sessionStorage.setItem("loggedInUser", loggedInUser);

                dispatch(getUserSuccess(response.data.result));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getUserError());
            });
    };

    const updateUser = async (User: IUser) => {
        dispatch(updateUserPending());
        const endpoint = `/services/app/User/Update`;
        await instance
            .put(endpoint, User)
            .then((response) => {
                dispatch(updateUserSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateUserError());
            });
    };

    const deleteUser = async (id: string) => {
        dispatch(deleteUserPending());
        const endpoint = `/services/app/User/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteUserSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteUserError());
            });
    };

    return (
        <UserStateContext.Provider value={state}>
            <UserActionContext.Provider
                value={{
                    getUserList,
                    getUser,
                    updateUser,
                    deleteUser,
                }}
            >
                {children}
            </UserActionContext.Provider>
        </UserStateContext.Provider>
    );
};

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