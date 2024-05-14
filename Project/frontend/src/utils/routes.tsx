import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import MedicalExapPage from "../pages/MedicalExamPage/MedicalExamPage";
import DiagnosesPage from "../pages/DiagnosesPage/DiagnosesPage";
import MedicalTechHomePage from "../pages/MedicalTechHomePage/MedicalTechHomePage";
import DoctorHomePage from "../pages/DoctorHomePage/DoctorHomePage";


export default function MyRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="medical-examination" element={<MedicalExapPage />} />
      <Route path="doctor-home-page" element={<DoctorHomePage />} />
      <Route path="diagnoses-page" element={<DiagnosesPage />} />
      <Route path="medical-tech-page" element={<MedicalTechHomePage />} />
    </Routes>
  );
}
