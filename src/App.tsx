import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./page/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/Login";
import StarshipsPage from "./page/StarshipsPage";
import StarshipDetail from "./components/templates/starship/StarshipDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />{" "}
        <Route path="starships" element={<StarshipsPage />} />
        <Route path="starships/:id" element={<StarshipDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
