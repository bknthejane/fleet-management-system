'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    MunicipalityStateContext,
    MunicipalityActionContext,
    INITIAL_STATE,
    IMunicipality
} from "./context";
import { MunicipalityReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getMunicipalityListPending,
    getMunicipalityListSuccess,
    getMunicipalityListError,
    getMunicipalityPending,
    getMunicipalitySuccess,
    getMunicipalityError,
    createMunicipalityPending,
    createMunicipalitySuccess,
    createMunicipalityError,
    updateMunicipalityPending,
    updateMunicipalitySuccess,
    updateMunicipalityError,
    deleteMunicipalityPending,
    deleteMunicipalitySuccess,
    deleteMunicipalityError
} from "./actions";

export const MunicipalityProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(MunicipalityReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getMunicipalityList = async () => {
        dispatch(getMunicipalityListPending());
        const endpoint = `/services/app/Municipality/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getMunicipalityListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getMunicipalityListError());
            });
    };



    const getMunicipality = async (id: string) => {
        dispatch(getMunicipalityPending());
        const endpoint = `/services/app/Municipality/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getMunicipalitySuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getMunicipalityError());
            });
    };

    const createMunicipality = async (municipality: IMunicipality) => {
        dispatch(createMunicipalityPending());
        const endpoint = `/services/app/Municipality/Create`;
        await instance
            .post(endpoint, municipality)
            .then((response) => {
                dispatch(createMunicipalitySuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createMunicipalityError());
            });
    };

    const updateMunicipality = async (municipality: IMunicipality) => {
        dispatch(updateMunicipalityPending());
        const endpoint = `/services/app/Municipality/Update`;
        await instance
            .put(endpoint, municipality)
            .then((response) => {
                dispatch(updateMunicipalitySuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateMunicipalityError());
            });
    };

    const deleteMunicipality = async (id: string) => {
        dispatch(deleteMunicipalityPending());
        const endpoint = `/services/app/Municipality/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteMunicipalitySuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteMunicipalityError());
            });
    };

    return (
        <MunicipalityStateContext.Provider value={state}>
            <MunicipalityActionContext.Provider 
                value={{
                    getMunicipalityList,
                    getMunicipality,
                    createMunicipality,
                    updateMunicipality,
                    deleteMunicipality
                }}
            >
                {children}
            </MunicipalityActionContext.Provider>
        </MunicipalityStateContext.Provider>
    );
};

export const useMunicipalityState = () => {
    const context = useContext(MunicipalityStateContext);
    if (!context) {
        throw new Error("useMunicipalityState must be used within a MunicipalityProvider");
    }
    return context;
};

export const useMunicipalityActions = () => {
    const context = useContext(MunicipalityActionContext);
    if (!context) {
        throw new Error("useMunicipalityActions must be used within a MunicipalityProvider");
    }
    return context;
};