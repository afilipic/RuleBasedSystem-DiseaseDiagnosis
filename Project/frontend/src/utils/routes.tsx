import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import MedicalExapPage from "../pages/MedicalExamPage/MedicalExamPage";
import DiagnosesPage from "../pages/DiagnosesPage/DiagnosesPage";
import MedicalTechHomePage from "../pages/MedicalTechHomePage/MedicalTechHomePage";
import DoctorHomePage from "../pages/DoctorHomePage/DoctorHomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import MedicalDiagnosisPage from "../pages/MedicalDiagnosisPage/MedicalDiagnosisPage";
import MedicalAnalysesPage from "../pages/MedicalAnalysesPage/MedicalAnalysesPage";
import AdminHomePage from "../pages/AdminHomePage/AdminHomePage";
import PatientHomePage from "../pages/PatientHomePage/PatientHomePage";


export default function MyRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="doctor-home-page" element={<DoctorHomePage />} />
      <Route path="medical-examination" element={<MedicalExapPage />} />

      <Route path="diagnoses-page" element={<DiagnosesPage />} /> 
      <Route path="medical-diagnosis" element={<MedicalDiagnosisPage />} />

      <Route path="medical-tech-page" element={<MedicalTechHomePage />} />
      <Route path="patient-analyses" element={<MedicalAnalysesPage />} />

      <Route path="registration" element={<RegistrationPage />} />
      <Route path="add-user" element={<RegistrationPage />} />

      <Route path="admin-home-page" element={<AdminHomePage />} />

      <Route path="patient-home-page" element={<PatientHomePage />} />

    </Routes>
  );
}
