'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    SupervisorStateContext,
    SupervisorActionContext,
    INITIAL_STATE,
    ISupervisor
} from "./context";
import { SupervisorReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getSupervisorListPending,
    getSupervisorListSuccess,
    getSupervisorListError,
    getSupervisorPending,
    getSupervisorSuccess,
    getSupervisorError,
    createSupervisorPending,
    createSupervisorSuccess,
    createSupervisorError,
    updateSupervisorPending,
    updateSupervisorSuccess,
    updateSupervisorError,
    deleteSupervisorPending,
    deleteSupervisorSuccess,
    deleteSupervisorError
} from "./actions";

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(SupervisorReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getSupervisorList = async () => {
        dispatch(getSupervisorListPending());
        const endpoint = `/services/app/Supervisor/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getSupervisorListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getSupervisorListError());
            });
    };



    const getSupervisor = async (id: string) => {
        dispatch(getSupervisorPending());
        const endpoint = `/services/app/Supervisor/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getSupervisorError());
            });
    };

    const createSupervisor = async (Supervisor: ISupervisor) => {
        dispatch(createSupervisorPending());
        const endpoint = `/services/app/Supervisor/Create`;
        await instance
            .post(endpoint, Supervisor)
            .then((response) => {
                dispatch(createSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createSupervisorError());
            });
    };

    const updateSupervisor = async (Supervisor: ISupervisor) => {
        dispatch(updateSupervisorPending());
        const endpoint = `/services/app/Supervisor/Update`;
        await instance
            .put(endpoint, Supervisor)
            .then((response) => {
                dispatch(updateSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateSupervisorError());
            });
    };

    const deleteSupervisor = async (id: string) => {
        dispatch(deleteSupervisorPending());
        const endpoint = `/services/app/Supervisor/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteSupervisorError());
            });
    };

    return (
        <SupervisorStateContext.Provider value={state}>
            <SupervisorActionContext.Provider 
                value={{
                    getSupervisorList,
                    getSupervisor,
                    createSupervisor,
                    updateSupervisor,
                    deleteSupervisor
                }}
            >
                {children}
            </SupervisorActionContext.Provider>
        </SupervisorStateContext.Provider>
    );
};

export const useSupervisorState = () => {
    const context = useContext(SupervisorStateContext);
    if (!context) {
        throw new Error("useSupervisorState must be used within a SupervisorProvider");
    }
    return context;
};

export const useSupervisorActions = () => {
    const context = useContext(SupervisorActionContext);
    if (!context) {
        throw new Error("useSupervisorActions must be used within a SupervisorProvider");
    }
    return context;
};