'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    DriverStateContext,
    DriverActionContext,
    INITIAL_STATE,
    IDriver
} from "./context";
import { DriverReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getDriverListPending,
    getDriverListSuccess,
    getDriverListError,
    getDriverPending,
    getDriverSuccess,
    getDriverError,
    createDriverPending,
    createDriverSuccess,
    createDriverError,
    updateDriverPending,
    updateDriverSuccess,
    updateDriverError,
    deleteDriverPending,
    deleteDriverSuccess,
    deleteDriverError
} from "./actions";

export const DriverProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(DriverReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getDriverList = async () => {
        dispatch(getDriverListPending());
        const endpoint = `/services/app/Driver/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getDriverListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getDriverListError());
            });
    };



    const getDriver = async (id: string) => {
        dispatch(getDriverPending());
        const endpoint = `/services/app/Driver/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getDriverSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getDriverError());
            });
    };

    const createDriver = async (driver: IDriver) => {
        dispatch(createDriverPending());
        const endpoint = `/services/app/Driver/Create`;
        await instance
            .post(endpoint, driver)
            .then((response) => {
                dispatch(createDriverSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createDriverError());
            });
    };

    const updateDriver = async (driver: IDriver) => {
        dispatch(updateDriverPending());
        const endpoint = `/services/app/Driver/Update`;
        await instance
            .put(endpoint, driver)
            .then((response) => {
                dispatch(updateDriverSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateDriverError());
            });
    };

    const deleteDriver = async (id: string) => {
        dispatch(deleteDriverPending());
        const endpoint = `/services/app/Driver/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteDriverSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteDriverError());
            });
    };

    return (
        <DriverStateContext.Provider value={state}>
            <DriverActionContext.Provider 
                value={{
                    getDriverList,
                    getDriver,
                    createDriver,
                    updateDriver,
                    deleteDriver
                }}
            >
                {children}
            </DriverActionContext.Provider>
        </DriverStateContext.Provider>
    );
};

export const useDriverState = () => {
    const context = useContext(DriverStateContext);
    if (!context) {
        throw new Error("useDriverState must be used within a DriverProvider");
    }
    return context;
};

export const useDriverActions = () => {
    const context = useContext(DriverActionContext);
    if (!context) {
        throw new Error("useDriverActions must be used within a DriverProvider");
    }
    return context;
};