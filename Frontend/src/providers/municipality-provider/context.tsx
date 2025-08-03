import { createContext } from "react";

export interface IMunicipality {
    id?: string;
    name?: string;
    address?: string;
    contactPerson?: string;
    email?: string;
    contactNumber?: string;
    adminUserName?: string;
    adminEmail?: string;
    adminPassword?: string;
    creatorUserId?: string;
    LastModifierUserId?: string;
}

export interface IMunicipalityStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    municipality?: IMunicipality;
    municipalities?: IMunicipality[];
}

export interface IMunicipalityActionContext {
    getMunicipalityList: () => void;
    getMunicipality: (id: string) => void;
    createMunicipality: (municipality: IMunicipality) => void;
    updateMunicipality: (municipality: IMunicipality) => void;
    deleteMunicipality: (id: string) => void;
}

export const INITIAL_STATE: IMunicipalityStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const MunicipalityStateContext = createContext<IMunicipalityStateContext>(INITIAL_STATE);
export const MunicipalityActionContext = createContext<IMunicipalityActionContext>(undefined!);