import { createContext } from "react";

export interface IUser {
    userNameOrEmailAddress: string;
    password: string;
}

export interface IUserStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    user?: IUser;
}

export interface IUserActionContext {
    userLogin: (payload: IUser) => void;
}

export const INITIAL_STATE: IUserStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
};

export const UserStateContext = createContext<IUserStateContext>(INITIAL_STATE);

export const UserActionContext = createContext<IUserActionContext>(undefined!);