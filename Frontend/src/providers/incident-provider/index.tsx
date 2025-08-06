'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    IncidentStateContext,
    IncidentActionContext,
    INITIAL_STATE,
    IIncident
} from "./context";
import { IncidentReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getIncidentListPending,
    getIncidentListSuccess,
    getIncidentListError,
    getIncidentPending,
    getIncidentSuccess,
    getIncidentError,
    createIncidentPending,
    createIncidentSuccess,
    createIncidentError,
    updateIncidentPending,
    updateIncidentSuccess,
    updateIncidentError,
    deleteIncidentPending,
    deleteIncidentSuccess,
    deleteIncidentError
} from "./actions";

export const IncidentProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(IncidentReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getIncidentList = async () => {
        dispatch(getIncidentListPending());
        const endpoint = `/services/app/Incident/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getIncidentListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getIncidentListError());
            });
    };



    const getIncident = async (id: string) => {
        dispatch(getIncidentPending());
        const endpoint = `/services/app/Incident/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getIncidentSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getIncidentError());
            });
    };

    const createIncident = async (incident: IIncident) => {
        dispatch(createIncidentPending());
        const endpoint = `/services/app/Incident/Create`;
        await instance
            .post(endpoint, incident)
            .then((response) => {
                dispatch(createIncidentSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createIncidentError());
            });
    };

    const updateIncident = async (incident: IIncident) => {
        dispatch(updateIncidentPending());
        const endpoint = `/services/app/Incident/Update`;
        await instance
            .put(endpoint, incident)
            .then((response) => {
                dispatch(updateIncidentSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateIncidentError());
            });
    };

    const deleteIncident = async (id: string) => {
        dispatch(deleteIncidentPending());
        const endpoint = `/services/app/Incident/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteIncidentSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteIncidentError());
            });
    };

    return (
        <IncidentStateContext.Provider value={state}>
            <IncidentActionContext.Provider 
                value={{
                    getIncidentList,
                    getIncident,
                    createIncident,
                    updateIncident,
                    deleteIncident
                }}
            >
                {children}
            </IncidentActionContext.Provider>
        </IncidentStateContext.Provider>
    );
};

export const useIncidentState = () => {
    const context = useContext(IncidentStateContext);
    if (!context) {
        throw new Error("useIncidentState must be used within a IncidentProvider");
    }
    return context;
};

export const useIncidentActions = () => {
    const context = useContext(IncidentActionContext);
    if (!context) {
        throw new Error("useIncidentActions must be used within a IncidentProvider");
    }
    return context;
};