import { createAction } from "redux-actions";
import { ISupervisor, ISupervisorStateContext } from "./context";

export enum SupervisorActionEnums {
    getSupervisorListPending = 'GET_SUPERVISOR_LIST_PENDING',
    getSupervisorListSuccess = 'GET_SUPERVISOR_LIST_SUCCESS',
    getSupervisorListError = 'GET_SUPERVISOR_LIST_ERROR',

    getSupervisorPending = 'GET_SUPERVISOR_PENDING',
    getSupervisorSuccess = 'GET_SUPERVISOR_SUCCESS',
    getSupervisorError = 'GET_SUPERVISOR_ERROR',

    createSupervisorPending = 'CREATE_SUPERVISOR_PENDING',
    createSupervisorSuccess = 'CREATE_SUPERVISOR_SUCCESS',
    createSupervisorError = 'CREATE_SUPERVISOR_ERROR',

    updateSupervisorPending = 'UPDATE_SUPERVISOR_PENDING',
    updateSupervisorSuccess = 'UPDATE_SUPERVISOR_SUCCESS',
    updateSupervisorError = 'UPDATE_SUPERVISOR_ERROR',

    deleteSupervisorPending = 'DELETE_SUPERVISOR_PENDING',
    deleteSupervisorSuccess = 'DELETE_SUPERVISOR_SUCCESS',
    deleteSupervisorError = 'DELETE_SUPERVISOR_ERROR'
}

export const getSupervisorListPending = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.getSupervisorListPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getSupervisorListSuccess = createAction<ISupervisorStateContext, ISupervisor[]>(
    SupervisorActionEnums.getSupervisorListSuccess, (supervisors: ISupervisor[]) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        supervisors,
    })
);

export const getSupervisorListError = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.getSupervisorListError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const getSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.getSupervisorPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionEnums.getSupervisorSuccess, (supervisor: ISupervisor) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        supervisor,
    })
);

export const getSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.getSupervisorError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const createSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.createSupervisorPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const createSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionEnums.createSupervisorSuccess, (supervisor: ISupervisor) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        supervisor,
    })
);

export const createSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.createSupervisorError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const updateSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.updateSupervisorPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const updateSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionEnums.updateSupervisorSuccess, (Supervisor: ISupervisor) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        Supervisor,
    })
);

export const updateSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.updateSupervisorError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const deleteSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.deleteSupervisorPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const deleteSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionEnums.deleteSupervisorSuccess, (Supervisor: ISupervisor) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        Supervisor,
    })
);

export const deleteSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionEnums.deleteSupervisorError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

