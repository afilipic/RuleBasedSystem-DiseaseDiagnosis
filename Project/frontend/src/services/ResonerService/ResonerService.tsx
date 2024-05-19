import { BloodTestRequest, SaveBloodTestRequest, SaveDiagnosis } from "../../models/BloodTests";
import { ChangePassword, NewUser } from "../../models/User";
import customAxios from "../AxiosInterceptor/AxiosInterceptor";

class ResonerService {
  getTests(bloodTestRequest: BloodTestRequest) {
    return customAxios.post(`/doctor/getBloodTest`, bloodTestRequest);
  }
  saveTests(saveBloodTests: SaveBloodTestRequest) {
    return customAxios.post(`/doctor/saveBloodTests`, saveBloodTests);
  }

  evaluateTests(evaluateRequest: SaveBloodTestRequest) {
    return customAxios.post(`/doctor/evaluateTests`, evaluateRequest);
  }

  setDiagnoses(saveDiagnosis: SaveDiagnosis) {
    return customAxios.post(`/doctor/saveDiagnosis`, saveDiagnosis);
  }

}

export default new ResonerService();
