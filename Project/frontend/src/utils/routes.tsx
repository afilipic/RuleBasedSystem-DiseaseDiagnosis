import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";


export default function MyRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
    </Routes>
  );
}
