import { createAction } from "redux-actions";
import { IJobCard, IJobCardStateContext } from "./context";

export enum JobCardActionEnums {
    getJobCardListPending = 'GET_JOBCARD_LIST_PENDING',
    getJobCardListSuccess = 'GET_JOBCARD_LIST_SUCCESS',
    getJobCardListError = 'GET_JOBCARD_LIST_ERROR',

    getJobCardPending = 'GET_JOBCARD_PENDING',
    getJobCardSuccess = 'GET_JOBCARD_SUCCESS',
    getJobCardError = 'GET_JOBCARD_ERROR',

    createJobCardPending = 'CREATE_JOBCARD_PENDING',
    createJobCardSuccess = 'CREATE_JOBCARD_SUCCESS',
    createJobCardError = 'CREATE_JOBCARD_ERROR',

    updateJobCardPending = 'UPDATE_JOBCARD_PENDING',
    updateJobCardSuccess = 'UPDATE_JOBCARD_SUCCESS',
    updateJobCardError = 'UPDATE_JOBCARD_ERROR',

    deleteJobCardPending = 'DELETE_JOBCARD_PENDING',
    deleteJobCardSuccess = 'DELETE_JOBCARD_SUCCESS',
    deleteJobCardError = 'DELETE_JOBCARD_ERROR'
}

export const getJobCardListPending = createAction<IJobCardStateContext>(
    JobCardActionEnums.getJobCardListPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getJobCardListSuccess = createAction<IJobCardStateContext, IJobCard[]>(
    JobCardActionEnums.getJobCardListSuccess, (jobCards: IJobCard[]) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        jobCards,
    })
);

export const getJobCardListError = createAction<IJobCardStateContext>(
    JobCardActionEnums.getJobCardListError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const getJobCardPending = createAction<IJobCardStateContext>(
    JobCardActionEnums.getJobCardPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const getJobCardSuccess = createAction<IJobCardStateContext, IJobCard>(
    JobCardActionEnums.getJobCardSuccess, (jobCard: IJobCard) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        jobCard,
    })
);

export const getJobCardError = createAction<IJobCardStateContext>(
    JobCardActionEnums.getJobCardError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const createJobCardPending = createAction<IJobCardStateContext>(
    JobCardActionEnums.createJobCardPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const createJobCardSuccess = createAction<IJobCardStateContext, IJobCard>(
    JobCardActionEnums.createJobCardSuccess, (jobCard: IJobCard) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        jobCard,
    })
);

export const createJobCardError = createAction<IJobCardStateContext>(
    JobCardActionEnums.createJobCardError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const updateJobCardPending = createAction<IJobCardStateContext>(
    JobCardActionEnums.updateJobCardPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const updateJobCardSuccess = createAction<IJobCardStateContext, IJobCard>(
    JobCardActionEnums.updateJobCardSuccess, (jobCard: IJobCard) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        jobCard,
    })
);

export const updateJobCardError = createAction<IJobCardStateContext>(
    JobCardActionEnums.updateJobCardError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

export const deleteJobCardPending = createAction<IJobCardStateContext>(
    JobCardActionEnums.deleteJobCardPending, () => (
    {
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);

export const deleteJobCardSuccess = createAction<IJobCardStateContext, IJobCard>(
    JobCardActionEnums.deleteJobCardSuccess, (jobCard: IJobCard) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        jobCard,
    })
);

export const deleteJobCardError = createAction<IJobCardStateContext>(
    JobCardActionEnums.deleteJobCardError, () => (
    {
        isPending: false,
        isSuccess: false,
        isError: true,
    })
);

