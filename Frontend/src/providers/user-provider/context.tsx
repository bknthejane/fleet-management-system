import { createContext } from "react";
import { IMunicipality } from "@/providers/municipality-provider/context";

export interface IUser {
  id?: string;
  userName?: string;
  name?: string;
  surname?: string;
  emailAddress?: string;
  roleNames?: string[];
  MunicipalityId?: string;
  municipality?: IMunicipality;
}

export interface IUserStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  user?: IUser;
  users?: IUser[];
}

export interface IUserActionContext {
  getUserList: () => void;
  getUser: (id: string) => void;
  updateUser: (user: IUser) => void;
  deleteUser: (id: string) => void;
}

export const INITIAL_STATE: IUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
}

export const UserStateContext = createContext<IUserStateContext>(INITIAL_STATE);
export const UserActionContext = createContext<IUserActionContext>(undefined!);