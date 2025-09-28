import DashboardLayout from "./components/layout/DashboardLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/Login";
import StarshipsPage from "./page/StarshipsPage";
import StarshipDetail from "./components/templates/starship/StarshipDetail";
import OverviewPage from "./page/Overview";
import FilmDetail from "./components/templates/overview/filmDetail";
import PeoplePage from "./page/People";
import PeopleDetail from "./components/templates/people/PeopleDetail";
import SpeciesPage from "./page/Species";
import SpeciesDetail from "./components/templates/species/SpeciesDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="films/:id" element={<FilmDetail />} />
        <Route path="starships" element={<StarshipsPage />} />
        <Route path="starships/:id" element={<StarshipDetail />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:id" element={<PeopleDetail />} />
        <Route path="species" element={<SpeciesPage />} />
        <Route path="species/:id" element={<SpeciesDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
