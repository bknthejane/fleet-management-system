import { createContext } from "react";

export interface IIncident {
    id?: string;
    description?: string;
    incidentType?: string;
    status?: string;
    vehicleId?: string;
    driverId?: string;
    municipalityId?: string;
    municipalityName?: string;
    department?: string;
    dateReported?: string;
    creatorUserId?: string;
    LastModifierUserId?: string;
}

export interface IIncidentStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    incident?: IIncident;
    incidents?: IIncident[];
}

export interface IIncidentActionContext {
    getIncidentList: () => void;
    getIncident: (id: string) => void;
    createIncident: (incident: IIncident) => void;
    updateIncident: (incident: IIncident) => void;
    deleteIncident: (id: string) => void;
}

export const INITIAL_STATE: IIncidentStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const IncidentStateContext = createContext<IIncidentStateContext>(INITIAL_STATE);
export const IncidentActionContext = createContext<IIncidentActionContext>(undefined!);