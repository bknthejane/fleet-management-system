import { createAction } from "redux-actions";
import { IMunicipality, IMunicipalityStateContext } from "./context";

export enum MunicipalityActionEnums {
    getMunicipalityListPending = 'GET_MUNICIPALITY_LIST_PENDING',
    getMunicipalityListSuccess = 'GET_MUNICIPALITY_LIST_SUCCESS',
    getMunicipalityListError = 'GET_MUNICIPALITY_LIST_ERROR',

    getMunicipalityPending = 'GET_MUNICIPALITY_PENDING',
    getMunicipalitySuccess = 'GET_MUNICIPALITY_SUCCESS',
    getMunicipalityError = 'GET_MUNICIPALITY_ERROR',

    createMunicipalityPending = 'CREATE_MUNICIPALITY_PENDING',
    createMunicipalitySuccess = 'CREATE_MUNICIPALITY_SUCCESS',
    createMunicipalityError = 'CREATE_MUNICIPALITY_ERROR',

    updateMunicipalityPending = 'UPDATE_MUNICIPALITY_PENDING',
    updateMunicipalitySuccess = 'UPDATE_MUNICIPALITY_SUCCESS',
    updateMunicipalityError = 'UPDATE_MUNICIPALITY_ERROR',

    deleteMunicipalityPending = 'DELETE_MUNICIPALITY_PENDING',
    deleteMunicipalitySuccess = 'DELETE_MUNICIPALITY_SUCCESS',
    deleteMunicipalityError = 'DELETE_MUNICIPALITY_ERROR'
}

export const getMunicipalityListPending = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.getMunicipalityListPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getMunicipalityListSuccess = createAction<IMunicipalityStateContext, IMunicipality[]>(
    MunicipalityActionEnums.getMunicipalityListSuccess, (municipalities: IMunicipality[]) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        municipalities,
    })
);

export const getMunicipalityListError = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.getMunicipalityListError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const getMunicipalityPending = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.getMunicipalityPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getMunicipalitySuccess = createAction<IMunicipalityStateContext, IMunicipality>(
    MunicipalityActionEnums.getMunicipalitySuccess, (municipality: IMunicipality) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        municipality,
    })
);

export const getMunicipalityError = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.getMunicipalityError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const createMunicipalityPending = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.createMunicipalityPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const createMunicipalitySuccess = createAction<IMunicipalityStateContext, IMunicipality>(
    MunicipalityActionEnums.createMunicipalitySuccess, (municipality: IMunicipality) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        municipality,
    })
);

export const createMunicipalityError = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.createMunicipalityError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const updateMunicipalityPending = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.updateMunicipalityPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const updateMunicipalitySuccess = createAction<IMunicipalityStateContext, IMunicipality>(
    MunicipalityActionEnums.updateMunicipalitySuccess, (municipality: IMunicipality) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        municipality,
    })
);

export const updateMunicipalityError = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.updateMunicipalityError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const deleteMunicipalityPending = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.deleteMunicipalityPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const deleteMunicipalitySuccess = createAction<IMunicipalityStateContext, IMunicipality>(
    MunicipalityActionEnums.deleteMunicipalitySuccess, (municipality: IMunicipality) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        municipality,
    })
);

export const deleteMunicipalityError = createAction<IMunicipalityStateContext>(
    MunicipalityActionEnums.deleteMunicipalityError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

