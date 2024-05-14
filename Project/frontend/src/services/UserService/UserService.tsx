import { ChangePassword, NewUser } from "../../models/User";
import customAxios from "../AxiosInterceptor/AxiosInterceptor";

class UserService {
  register(userData: NewUser) {
    return customAxios.post(`/user/register`, userData);
  }
  registerAdmin(userData: NewUser) {
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

}

export default new UserService();
