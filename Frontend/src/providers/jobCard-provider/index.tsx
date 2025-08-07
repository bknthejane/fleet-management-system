'use client';
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    JobCardStateContext,
    JobCardActionContext,
    INITIAL_STATE,
    IJobCard
} from "./context";
import { JobCardReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    getJobCardListPending,
    getJobCardListSuccess,
    getJobCardListError,
    getJobCardPending,
    getJobCardSuccess,
    getJobCardError,
    createJobCardPending,
    createJobCardSuccess,
    createJobCardError,
    updateJobCardPending,
    updateJobCardSuccess,
    updateJobCardError,
    deleteJobCardPending,
    deleteJobCardSuccess,
    deleteJobCardError
} from "./actions";

export const JobCardProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(JobCardReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getJobCardList = async () => {
        dispatch(getJobCardListPending());
        const endpoint = `/services/app/JobCard/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getJobCardListSuccess(response.data.result));
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error(error);
                dispatch(getJobCardListError());
            });
    };



    const getJobCard = async (id: string) => {
        dispatch(getJobCardPending());
        const endpoint = `/services/app/JobCard/Get/${id}`;
        await instance
            .get(endpoint)
            .then((response)=> {
                dispatch(getJobCardSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getJobCardError());
            });
    };

    const createJobCard = async (JobCard: IJobCard) => {
        dispatch(createJobCardPending());
        const endpoint = `/services/app/JobCard/Create`;
        await instance
            .post(endpoint, JobCard)
            .then((response) => {
                dispatch(createJobCardSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createJobCardError());
            });
    };

    const updateJobCard = async (JobCard: IJobCard) => {
        dispatch(updateJobCardPending());
        const endpoint = `/services/app/JobCard/Update`;
        await instance
            .put(endpoint, JobCard)
            .then((response) => {
                dispatch(updateJobCardSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateJobCardError());
            });
    };

    const deleteJobCard = async (id: string) => {
        dispatch(deleteJobCardPending());
        const endpoint = `/services/app/JobCard/Delete/${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteJobCardSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteJobCardError());
            });
    };

    return (
        <JobCardStateContext.Provider value={state}>
            <JobCardActionContext.Provider 
                value={{
                    getJobCardList,
                    getJobCard,
                    createJobCard,
                    updateJobCard,
                    deleteJobCard
                }}
            >
                {children}
            </JobCardActionContext.Provider>
        </JobCardStateContext.Provider>
    );
};

export const useJobCardState = () => {
    const context = useContext(JobCardStateContext);
    if (!context) {
        throw new Error("useJobCardState must be used within a JobCardProvider");
    }
    return context;
};

export const useJobCardActions = () => {
    const context = useContext(JobCardActionContext);
    if (!context) {
        throw new Error("useJobCardActions must be used within a JobCardProvider");
    }
    return context;
};