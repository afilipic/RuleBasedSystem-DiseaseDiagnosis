import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import MedicalExapPage from "../pages/MedicalExamPage/MedicalExamPage";
import LoginPage from "../pages/LoginPage/LoginPage";


export default function MyRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="medical-examination" element={<MedicalExapPage />} />
    </Routes>
  );
}
