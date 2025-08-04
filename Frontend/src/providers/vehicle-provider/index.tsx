'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    VehicleStateContext,
    VehicleActionContext,
    INITIAL_STATE,
    IVehicle
} from "./context";
import { VehicleReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getVehicleListPending,
    getVehicleListSuccess,
    getVehicleListError,
    getVehiclePending,
    getVehicleSuccess,
    getVehicleError,
    createVehiclePending,
    createVehicleSuccess,
    createVehicleError,
    updateVehiclePending,
    updateVehicleSuccess,
    updateVehicleError,
    deleteVehiclePending,
    deleteVehicleSuccess,
    deleteVehicleError
} from "./actions";

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(VehicleReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getVehicleList = async () => {
        dispatch(getVehicleListPending());
        const endpoint = `/services/app/Vehicle/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getVehicleListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getVehicleListError());
            });
    };



    const getVehicle = async (id: string) => {
        dispatch(getVehiclePending());
        const endpoint = `/services/app/Vehicle/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getVehicleSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getVehicleError());
            });
    };

    const createVehicle = async (vehicle: IVehicle) => {
        dispatch(createVehiclePending());
        const endpoint = `/services/app/Vehicle/Create`;
        await instance
            .post(endpoint, vehicle)
            .then((response) => {
                dispatch(createVehicleSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createVehicleError());
            });
    };

    const updateVehicle = async (Vehicle: IVehicle) => {
        dispatch(updateVehiclePending());
        const endpoint = `/services/app/Vehicle/Update`;
        await instance
            .put(endpoint, Vehicle)
            .then((response) => {
                dispatch(updateVehicleSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateVehicleError());
            });
    };

    const deleteVehicle = async (id: string) => {
        dispatch(deleteVehiclePending());
        const endpoint = `/services/app/Vehicle/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteVehicleSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteVehicleError());
            });
    };

    return (
        <VehicleStateContext.Provider value={state}>
            <VehicleActionContext.Provider 
                value={{
                    getVehicleList,
                    getVehicle,
                    createVehicle,
                    updateVehicle,
                    deleteVehicle
                }}
            >
                {children}
            </VehicleActionContext.Provider>
        </VehicleStateContext.Provider>
    );
};

export const useVehicleState = () => {
    const context = useContext(VehicleStateContext);
    if (!context) {
        throw new Error("useVehicleState must be used within a VehicleProvider");
    }
    return context;
};

export const useVehicleActions = () => {
    const context = useContext(VehicleActionContext);
    if (!context) {
        throw new Error("useVehicleActions must be used within a VehicleProvider");
    }
    return context;
};