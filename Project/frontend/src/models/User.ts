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

export interface PatientDTO{
  birthDate: string;
  bloodTestAnalyses: BloodTestAnalysis[];
  bloodType: string;
  diagnoses: Diagnosis[];
  firstname: string;
  gender: string;
  height: number;
  lastname: string;
  telephoneNumber: string;
  username: string;
  weight: number;
}

interface BloodTestAnalysis {
  // Define properties for BloodTestAnalysis here
}

interface Diagnosis {
  // Define properties for Diagnosis here
}