import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import MedicalExapPage from "../pages/MedicalExamPage/MedicalExamPage";


export default function MyRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="patient-home-page" element={<MedicalExapPage />} />
      
    </Routes>
  );
}
