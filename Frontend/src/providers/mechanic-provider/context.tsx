import { createContext } from "react";

export interface IMechanic {
    id?: string;
    name?: string;
    surname?: string;
    municipalityId?: string;
    municipalityName?: string;
    supervisorId?: string;
    assignedJobCardId?: string;
    assignedJobCardNumber?: string;
    username?: string;
    email?: string;
    password?: string;
    creatorUserId?: string;
    userId?: string;
    LastModifierUserId?: string;
    department?: string;
}

export interface IMechanicStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    mechanic?: IMechanic;
    mechanics?: IMechanic[];
}

export interface IMechanicActionContext {
    getMechanicList: () => void;
    getMechanic: (id: string) => void;
    createMechanic: (mechanic: IMechanic) => void;
    updateMechanic: (mechanic: IMechanic) => void;
    deleteMechanic: (id: string) => void;
}

export const INITIAL_STATE: IMechanicStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const MechanicStateContext = createContext<IMechanicStateContext>(INITIAL_STATE);
export const MechanicActionContext = createContext<IMechanicActionContext>(undefined!);