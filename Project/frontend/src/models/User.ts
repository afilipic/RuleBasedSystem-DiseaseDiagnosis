import exp from "constants";
import Role from "./enums/Role";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: Role;
  verified: boolean;
}

export interface NewUser {
  name: string;
  username: string;
  password: string;
  confPassword : string;
  verified?: boolean;
}
export interface LoginUser{
  id: number;
  token: string;
  role: Role;
}

export interface ChangePassword{
  username: string;
  password: string;
  confPassword : string;
}