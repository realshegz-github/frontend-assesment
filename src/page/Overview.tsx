import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  fetchFilms,
  fetchPeople,
  fetchSpecies,
  fetchStarships,
} from "../api/xhrHelpers";
import DataTable from "../components/DataTable";
import type { Film } from "../types/common.types";
import { extractIdFromUrl } from "../utils/hooks/helpers";
import MetricCard from "../components/MetricsCard";

const columns = [
  { id: "title", label: "Title" },
  { id: "release_date", label: "Release Date" },
  { id: "director", label: "Director" },
  { id: "episode_id", label: "Episode Id" },
  { id: "producer", label: "Producer" },
];

const OverviewPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { films, people, species, starships, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchPeople());
    dispatch(fetchSpecies());
    dispatch(fetchStarships());
  }, [dispatch]);

  const metricsData = [
    {
      title: "Films",
      value: films.length,
      desc: "20 More than than yesterday",
      color: "#A9FFE0",
    },
    {
      title: "Starships",
      value: starships.length,
      desc: "20 More than than yesterday",
      color: "#A9C1FF",
    },
    {
      title: "People",
      value: people.length,
      desc: "20 More than than yesterday",
      color: "#FFA9EC",
    },
    {
      title: "Species",
      value: species.length,
      desc: "20 More than than yesterday",
      color: "#FDFFA9",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Failed to load Films: {error}
      </Typography>
    );
  }

  const rows = films.map((film) => ({
    ...film,
    id: extractIdFromUrl(film.url),
  }));

  return (
    <Box component="section">
      <div className="grid grid-cols-2 ss:flex gap-4 justify-between items-center flex-wrap mb-16">
        {metricsData.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            desc={metric.desc}
            color={metric.color}
          />
        ))}
      </div>

      <div>
        <Typography variant="body1" className="text-[#A4A7B7]" mb={4}>
          Films
        </Typography>
        <DataTable<Film & { id: string }>
          columns={columns}
          rows={rows}
          rowKey="id"
          detailPath="/app/films"
          onSelectionChange={(selected) => {
            console.log("Selected films:", selected);
          }}
        />
      </div>
    </Box>
  );
};

export default OverviewPage;
