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
    changePasswordPending,
    changePasswordSuccess,
    changePasswordError
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
                console.log("Municipality name: ", response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getUserListError());
            });
    };



    const getUser = async (id: string): Promise<IUser> => {
        try {
            dispatch(getUserPending());
            const endpoint = `/services/app/User/Get?Id=${id}`;
            const response = await instance.get(endpoint);

            const result = response.data.result;

            sessionStorage.setItem("municipalityName", result.municipalityName || "");
            sessionStorage.setItem("municipalityId", result.municipalityId || "");
            sessionStorage.setItem("loggedInUser", result.name || "");
            sessionStorage.setItem("supervisorId", result.supervisorId || "");
            sessionStorage.setItem("driverId", result.driverId || "");
            sessionStorage.setItem("vehicleId", result.assignedVehicleId || "");
            sessionStorage.setItem("mechanicId", result.mechanicId || "");
            sessionStorage.setItem("mechanicName", result.mechanicName || "");

            dispatch(getUserSuccess(result));

            return result;
        } catch (error) {
            console.error(error);
            dispatch(getUserError());
            throw error;
        }
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

    const changePassword = async (User: IUser) => {
        dispatch(changePasswordPending());
        const endpoint = `/services/app/User/ResetPassword`;
        await instance
            .post(endpoint, User)
            .then((response) => {
                dispatch(changePasswordSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(changePasswordError())
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
                    changePassword
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