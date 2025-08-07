import { handleActions } from "redux-actions";
import { INITIAL_STATE, IJobCardStateContext } from "./context";
import { JobCardActionEnums } from "./actions";

export const JobCardReducer = handleActions<IJobCardStateContext, IJobCardStateContext>(
    {
        [JobCardActionEnums.getJobCardListPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.getJobCardListSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.getJobCardListError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.getJobCardPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.getJobCardSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.getJobCardError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.createJobCardPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.createJobCardSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.createJobCardError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.updateJobCardPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.updateJobCardSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.updateJobCardError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.deleteJobCardPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.deleteJobCardSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [JobCardActionEnums.deleteJobCardError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    }, INITIAL_STATE
);