import { createAction } from "redux-actions";
import { IVehicle, IVehicleStateContext } from "./context";

export enum VehicleActionEnums {
    getVehicleListPending = 'GET_VEHICLE_LIST_PENDING',
    getVehicleListSuccess = 'GET_VEHICLE_LIST_SUCCESS',
    getVehicleListError = 'GET_VEHICLE_LIST_ERROR',

    getVehiclePending = 'GET_VEHICLE_PENDING',
    getVehicleSuccess = 'GET_VEHICLE_SUCCESS',
    getVehicleError = 'GET_VEHICLE_ERROR',

    createVehiclePending = 'CREATE_VEHICLE_PENDING',
    createVehicleSuccess = 'CREATE_VEHICLE_SUCCESS',
    createVehicleError = 'CREATE_VEHICLE_ERROR',

    updateVehiclePending = 'UPDATE_VEHICLE_PENDING',
    updateVehicleSuccess = 'UPDATE_VEHICLE_SUCCESS',
    updateVehicleError = 'UPDATE_VEHICLE_ERROR',

    deleteVehiclePending = 'DELETE_VEHICLE_PENDING',
    deleteVehicleSuccess = 'DELETE_VEHICLE_SUCCESS',
    deleteVehicleError = 'DELETE_VEHICLE_ERROR'
}

export const getVehicleListPending = createAction<IVehicleStateContext>(
    VehicleActionEnums.getVehicleListPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getVehicleListSuccess = createAction<IVehicleStateContext, IVehicle[]>(
    VehicleActionEnums.getVehicleListSuccess, (vehicles: IVehicle[]) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        vehicles,
    })
);

export const getVehicleListError = createAction<IVehicleStateContext>(
    VehicleActionEnums.getVehicleListError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const getVehiclePending = createAction<IVehicleStateContext>(
    VehicleActionEnums.getVehiclePending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getVehicleSuccess = createAction<IVehicleStateContext, IVehicle>(
    VehicleActionEnums.getVehicleSuccess, (vehicle: IVehicle) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        vehicle,
    })
);

export const getVehicleError = createAction<IVehicleStateContext>(
    VehicleActionEnums.getVehicleError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const createVehiclePending = createAction<IVehicleStateContext>(
    VehicleActionEnums.createVehiclePending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const createVehicleSuccess = createAction<IVehicleStateContext, IVehicle>(
    VehicleActionEnums.createVehicleSuccess, (vehicle: IVehicle) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        vehicle,
    })
);

export const createVehicleError = createAction<IVehicleStateContext>(
    VehicleActionEnums.createVehicleError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const updateVehiclePending = createAction<IVehicleStateContext>(
    VehicleActionEnums.updateVehiclePending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const updateVehicleSuccess = createAction<IVehicleStateContext, IVehicle>(
    VehicleActionEnums.updateVehicleSuccess, (vehicle: IVehicle) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        vehicle,
    })
);

export const updateVehicleError = createAction<IVehicleStateContext>(
    VehicleActionEnums.updateVehicleError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const deleteVehiclePending = createAction<IVehicleStateContext>(
    VehicleActionEnums.deleteVehiclePending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const deleteVehicleSuccess = createAction<IVehicleStateContext, IVehicle>(
    VehicleActionEnums.deleteVehicleSuccess, (vehicle: IVehicle) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        vehicle,
    })
);

export const deleteVehicleError = createAction<IVehicleStateContext>(
    VehicleActionEnums.deleteVehicleError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

