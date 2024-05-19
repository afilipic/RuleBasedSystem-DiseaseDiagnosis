import exp from "constants";
import Role from "./enums/Role";
import { AnalysisParameters, BloodTestResponse, Symptoms } from "./BloodTests";

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
  bloodTestAnalyses: BloodTestResponse[];
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

export interface Diagnosis {
  id: number;
  patient: PatientDTO;
  doctor : User;
  disease : Disease;
  date : Date;
}

export interface Disease{
  id: number;
  name: string;
  description: string;
  symptoms: Symptoms[];
  bloodTests: AnalysisParameters[];
}

export interface UserDTO {
  username: string;
  firstname: string;
  lastname: string;
  telephoneNumber: string;
  password: string;
  birthDate: Date;
  gender: string;
  height: number;
  weight: number;
  bloodType: string;
  role: Role;
  verified?: boolean;
}
export interface EvaluationResult{
  patient: number;
  evaluation: Map<String, number>;
}