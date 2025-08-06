import { createAction } from "redux-actions";
import { IIncident, IIncidentStateContext } from "./context";

export enum IncidentActionEnums {
    getIncidentListPending = 'GET_INCIDENT_LIST_PENDING',
    getIncidentListSuccess = 'GET_INCIDENT_LIST_SUCCESS',
    getIncidentListError = 'GET_INCIDENT_LIST_ERROR',

    getIncidentPending = 'GET_INCIDENT_PENDING',
    getIncidentSuccess = 'GET_INCIDENT_SUCCESS',
    getIncidentError = 'GET_INCIDENT_ERROR',

    createIncidentPending = 'CREATE_INCIDENT_PENDING',
    createIncidentSuccess = 'CREATE_INCIDENT_SUCCESS',
    createIncidentError = 'CREATE_INCIDENT_ERROR',

    updateIncidentPending = 'UPDATE_INCIDENT_PENDING',
    updateIncidentSuccess = 'UPDATE_INCIDENT_SUCCESS',
    updateIncidentError = 'UPDATE_INCIDENT_ERROR',

    deleteIncidentPending = 'DELETE_INCIDENT_PENDING',
    deleteIncidentSuccess = 'DELETE_INCIDENT_SUCCESS',
    deleteIncidentError = 'DELETE_INCIDENT_ERROR'
}

export const getIncidentListPending = createAction<IIncidentStateContext>(
    IncidentActionEnums.getIncidentListPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getIncidentListSuccess = createAction<IIncidentStateContext, IIncident[]>(
    IncidentActionEnums.getIncidentListSuccess, (incidents: IIncident[]) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        incidents,
    })
);

export const getIncidentListError = createAction<IIncidentStateContext>(
    IncidentActionEnums.getIncidentListError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const getIncidentPending = createAction<IIncidentStateContext>(
    IncidentActionEnums.getIncidentPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getIncidentSuccess = createAction<IIncidentStateContext, IIncident>(
    IncidentActionEnums.getIncidentSuccess, (incident: IIncident) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        incident,
    })
);

export const getIncidentError = createAction<IIncidentStateContext>(
    IncidentActionEnums.getIncidentError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const createIncidentPending = createAction<IIncidentStateContext>(
    IncidentActionEnums.createIncidentPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const createIncidentSuccess = createAction<IIncidentStateContext, IIncident>(
    IncidentActionEnums.createIncidentSuccess, (incident: IIncident) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        incident,
    })
);

export const createIncidentError = createAction<IIncidentStateContext>(
    IncidentActionEnums.createIncidentError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const updateIncidentPending = createAction<IIncidentStateContext>(
    IncidentActionEnums.updateIncidentPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const updateIncidentSuccess = createAction<IIncidentStateContext, IIncident>(
    IncidentActionEnums.updateIncidentSuccess, (incident: IIncident) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        incident,
    })
);

export const updateIncidentError = createAction<IIncidentStateContext>(
    IncidentActionEnums.updateIncidentError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const deleteIncidentPending = createAction<IIncidentStateContext>(
    IncidentActionEnums.deleteIncidentPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const deleteIncidentSuccess = createAction<IIncidentStateContext, IIncident>(
    IncidentActionEnums.deleteIncidentSuccess, (incident: IIncident) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        incident,
    })
);

export const deleteIncidentError = createAction<IIncidentStateContext>(
    IncidentActionEnums.deleteIncidentError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

