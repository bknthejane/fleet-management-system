import { createContext } from "react";

export interface ISupervisor {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    contactNumber?: string;
    department?: string;
    municipalityId?: string;
    municipalityName?: string;
    username?: string;
    password?: string;
    creatorUserId?: string;
    LastModifierUserId?: string;
}

export interface ISupervisorStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    supervisor?: ISupervisor;
    supervisors?: ISupervisor[];
}

export interface ISupervisorActionContext {
    getSupervisorList: () => void;
    getSupervisor: (id: string) => void;
    createSupervisor: (supervisor: ISupervisor) => void;
    updateSupervisor: (supervisor: ISupervisor) => void;
    deleteSupervisor: (id: string) => void;
}

export const INITIAL_STATE: ISupervisorStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const SupervisorStateContext = createContext<ISupervisorStateContext>(INITIAL_STATE);
export const SupervisorActionContext = createContext<ISupervisorActionContext>(undefined!);