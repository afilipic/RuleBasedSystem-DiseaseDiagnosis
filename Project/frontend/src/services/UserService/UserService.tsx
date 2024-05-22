import { ChangePassword, NewUser, UserDTO } from "../../models/User";
import customAxios from "../AxiosInterceptor/AxiosInterceptor";

class UserService {
  register(userData: UserDTO) {
    return customAxios.post(`/user/register`, userData);
  }
  registerAdmin(userData: NewUser) {
    return customAxios.post(`/user/registerPatient`, userData);
  }
  registerPatient(userData: UserDTO) {
    return customAxios.post(`/user/registerPatient`, userData);
  }
  login(userData: { username: string; password: string }) {
    return customAxios.post(`/user/login`, userData);
  }
  changePassword(userData: ChangePassword) {
    return customAxios.post(`/user/changePassword`, userData);
  }

  getAllPatients() {
    return customAxios.get(`/patient/all`);
  }
  getAllUsers() {
    return customAxios.get(`/user/all`);
  }
  getPatientById(patientId : number) {
    return customAxios.get(`/patient/${patientId}`);
}
}

export default new UserService();
