import { createAction } from "redux-actions";
import { IMechanic, IMechanicStateContext } from "./context";

export enum MechanicActionEnums {
    getMechanicListPending = 'GET_MECHANIC_LIST_PENDING',
    getMechanicListSuccess = 'GET_MECHANIC_LIST_SUCCESS',
    getMechanicListError = 'GET_MECHANIC_LIST_ERROR',

    getMechanicPending = 'GET_MECHANIC_PENDING',
    getMechanicSuccess = 'GET_MECHANIC_SUCCESS',
    getMechanicError = 'GET_MECHANIC_ERROR',

    createMechanicPending = 'CREATE_MECHANIC_PENDING',
    createMechanicSuccess = 'CREATE_MECHANIC_SUCCESS',
    createMechanicError = 'CREATE_MECHANIC_ERROR',

    updateMechanicPending = 'UPDATE_MECHANIC_PENDING',
    updateMechanicSuccess = 'UPDATE_MECHANIC_SUCCESS',
    updateMechanicError = 'UPDATE_MECHANIC_ERROR',

    deleteMechanicPending = 'DELETE_MECHANIC_PENDING',
    deleteMechanicSuccess = 'DELETE_MECHANIC_SUCCESS',
    deleteMechanicError = 'DELETE_MECHANIC_ERROR'
}

export const getMechanicListPending = createAction<IMechanicStateContext>(
    MechanicActionEnums.getMechanicListPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getMechanicListSuccess = createAction<IMechanicStateContext, IMechanic[]>(
    MechanicActionEnums.getMechanicListSuccess, (mechanics: IMechanic[]) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        mechanics,
    })
);

export const getMechanicListError = createAction<IMechanicStateContext>(
    MechanicActionEnums.getMechanicListError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const getMechanicPending = createAction<IMechanicStateContext>(
    MechanicActionEnums.getMechanicPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getMechanicSuccess = createAction<IMechanicStateContext, IMechanic>(
    MechanicActionEnums.getMechanicSuccess, (mechanic: IMechanic) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        mechanic,
    })
);

export const getMechanicError = createAction<IMechanicStateContext>(
    MechanicActionEnums.getMechanicError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const createMechanicPending = createAction<IMechanicStateContext>(
    MechanicActionEnums.createMechanicPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const createMechanicSuccess = createAction<IMechanicStateContext, IMechanic>(
    MechanicActionEnums.createMechanicSuccess, (mechanic: IMechanic) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        mechanic,
    })
);

export const createMechanicError = createAction<IMechanicStateContext>(
    MechanicActionEnums.createMechanicError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const updateMechanicPending = createAction<IMechanicStateContext>(
    MechanicActionEnums.updateMechanicPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const updateMechanicSuccess = createAction<IMechanicStateContext, IMechanic>(
    MechanicActionEnums.updateMechanicSuccess, (mechanic: IMechanic) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        mechanic,
    })
);

export const updateMechanicError = createAction<IMechanicStateContext>(
    MechanicActionEnums.updateMechanicError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const deleteMechanicPending = createAction<IMechanicStateContext>(
    MechanicActionEnums.deleteMechanicPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const deleteMechanicSuccess = createAction<IMechanicStateContext, IMechanic>(
    MechanicActionEnums.deleteMechanicSuccess, (mechanic: IMechanic) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        mechanic,
    })
);

export const deleteMechanicError = createAction<IMechanicStateContext>(
    MechanicActionEnums.deleteMechanicError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

