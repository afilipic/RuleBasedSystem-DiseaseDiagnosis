import { BloodTestRequest, SaveBloodTestRequest } from "../../models/BloodTests";
import { ChangePassword, NewUser } from "../../models/User";
import customAxios from "../AxiosInterceptor/AxiosInterceptor";

class ResonerService {
  getTests(bloodTestRequest: BloodTestRequest) {
    return customAxios.post(`/doctor/getBloodTest`, bloodTestRequest);
  }
  saveTests(saveBloodTests: SaveBloodTestRequest) {
    return customAxios.post(`/doctor/saveBloodTests`, saveBloodTests);
  }

}

export default new ResonerService();
