import { createContext } from "react";

export interface IJobCard {
    id?: string;
    incidentId?: string;
    vehicleId?: string;
    driverId?: string;
    supervisorId?: string;
    notes?: string;
    jobCardNumber?: string;
    status?: string;
    priority?: string;
    dateOpened?: string;
    dateCompleted?: string;
    assignedMechanicId?: string;
    assignedMechanicName?: string;
    creatorUserId?: string;
    LastModifierUserId?: string;
}

export interface IJobCardStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    jobCard?: IJobCard;
    jobCards?: IJobCard[];
}

export interface IJobCardActionContext {
    getJobCardList: () => void;
    getJobCard: (id: string) => void;
    createJobCard: (jobCard: IJobCard) => void;
    updateJobCard: (jobCard: IJobCard) => void;
    deleteJobCard: (id: string) => void;
}

export const INITIAL_STATE: IJobCardStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const JobCardStateContext = createContext<IJobCardStateContext>(INITIAL_STATE);
export const JobCardActionContext = createContext<IJobCardActionContext>(undefined!);