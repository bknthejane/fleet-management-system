'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    MechanicStateContext,
    MechanicActionContext,
    INITIAL_STATE,
    IMechanic
} from "./context";
import { MechanicReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getMechanicListPending,
    getMechanicListSuccess,
    getMechanicListError,
    getMechanicPending,
    getMechanicSuccess,
    getMechanicError,
    createMechanicPending,
    createMechanicSuccess,
    createMechanicError,
    updateMechanicPending,
    updateMechanicSuccess,
    updateMechanicError,
    deleteMechanicPending,
    deleteMechanicSuccess,
    deleteMechanicError
} from "./actions";

export const MechanicProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(MechanicReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getMechanicList = async () => {
        dispatch(getMechanicListPending());
        const endpoint = `/services/app/Mechanic/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getMechanicListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getMechanicListError());
            });
    };



    const getMechanic = async (id: string) => {
        dispatch(getMechanicPending());
        const endpoint = `/services/app/Mechanic/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getMechanicSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getMechanicError());
            });
    };

    const createMechanic = async (Mechanic: IMechanic) => {
        dispatch(createMechanicPending());
        const endpoint = `/services/app/Mechanic/Create`;
        await instance
            .post(endpoint, Mechanic)
            .then((response) => {
                dispatch(createMechanicSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createMechanicError());
            });
    };

    const updateMechanic = async (Mechanic: IMechanic) => {
        dispatch(updateMechanicPending());
        const endpoint = `/services/app/Mechanic/Update`;
        await instance
            .put(endpoint, Mechanic)
            .then((response) => {
                dispatch(updateMechanicSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateMechanicError());
            });
    };

    const deleteMechanic = async (id: string) => {
        dispatch(deleteMechanicPending());
        const endpoint = `/services/app/Mechanic/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteMechanicSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteMechanicError());
            });
    };

    return (
        <MechanicStateContext.Provider value={state}>
            <MechanicActionContext.Provider 
                value={{
                    getMechanicList,
                    getMechanic,
                    createMechanic,
                    updateMechanic,
                    deleteMechanic
                }}
            >
                {children}
            </MechanicActionContext.Provider>
        </MechanicStateContext.Provider>
    );
};

export const useMechanicState = () => {
    const context = useContext(MechanicStateContext);
    if (!context) {
        throw new Error("useMechanicState must be used within a MechanicProvider");
    }
    return context;
};

export const useMechanicActions = () => {
    const context = useContext(MechanicActionContext);
    if (!context) {
        throw new Error("useMechanicActions must be used within a MechanicProvider");
    }
    return context;
};