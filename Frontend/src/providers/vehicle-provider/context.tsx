import { createContext } from "react";

export interface IVehicle {
    id?: string;
    fleetNumber?: string;
    registrationNumber?: string;
    model?: string;
    make?: string;
    licenseExpiry?: string;
    municipalityId?: string;
    municipalityName?: string;
    assignedDriverId?: string;
    assignedDriverName?: string;
    creatorUserId?: string;
}

export interface IVehicleStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    vehicle?: IVehicle;
    vehicles?: IVehicle[];
}

export interface IVehicleActionContext {
    getVehicleList: () => void;
    getVehicle: (id: string) => void;
    createVehicle: (vehicle: IVehicle) => void;
    updateVehicle: (vehicle: IVehicle) => void;
    deleteVehicle: (id: string) => void;
}

export const INITIAL_STATE: IVehicleStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const VehicleStateContext = createContext<IVehicleStateContext>(INITIAL_STATE);
export const VehicleActionContext = createContext<IVehicleActionContext>(undefined!);