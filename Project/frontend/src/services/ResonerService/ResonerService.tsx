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
  saveTestResults(saveBloodTests: SaveBloodTestRequest) {
    return customAxios.post(`/technician/saveBloodTestResult`, saveBloodTests);
  }


  evaluateTests(evaluateRequest: SaveBloodTestRequest) {
    return customAxios.post(`/doctor/evaluateTests`, evaluateRequest);
  }

  evaluateAnamnesis(evaluateRequest: any) {
    return customAxios.post(`/doctor/evaluateAnamnesis`, evaluateRequest);
  }

  setDiagnoses(saveDiagnosis: SaveDiagnosis) {
    return customAxios.post(`/doctor/saveDiagnosis`, saveDiagnosis);
  }

}

export default new ResonerService();
