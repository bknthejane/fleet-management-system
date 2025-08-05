import { createContext } from "react";

export interface IDriver {
    id?: string;
    name?: string;
    surname?: string;
    municipalityId?: string;
    municipalityName?: string;
    assignedVehicleId?: string;
    assignedVehicleFleetNumber?: string;
    username?: string;
    email?: string;
    password?: string;
    creatorUserId?: string;
    userId?: string;
    IsActive?: true;
    LastModifierUserId?: string;
}

export interface IDriverStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    driver?: IDriver;
    drivers?: IDriver[];
}

export interface IDriverActionContext {
    getDriverList: () => void;
    getDriver: (id: string) => void;
    createDriver: (driver: IDriver) => void;
    updateDriver: (driver: IDriver) => void;
    deleteDriver: (id: string) => void;
}

export const INITIAL_STATE: IDriverStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}

export const DriverStateContext = createContext<IDriverStateContext>(INITIAL_STATE);
export const DriverActionContext = createContext<IDriverActionContext>(undefined!);