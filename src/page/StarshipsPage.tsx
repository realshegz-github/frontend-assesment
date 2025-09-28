import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchStarships } from "../api/xhrHelpers";
import type { Starship } from "../types/common.types";
import DataTable from "../components/DataTable";
import { extractIdFromUrl } from "../utils/hooks/helpers";

const columns = [
  { id: "name", label: "Name" },
  { id: "model", label: "Model" },
  { id: "starship_class", label: "Class" },
  { id: "passengers", label: "Passengers" },
  { id: "length", label: "Length" },
];

const StarshipsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { starships, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchStarships());
  }, [dispatch]);

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
        Failed to load starships: {error}
      </Typography>
    );
  }

  // map starships so rowKey is clean numeric ID
  const rows = starships.map((ship) => ({
    ...ship,
    id: extractIdFromUrl(ship.url),
  }));

  return (
    <DataTable<Starship & { id: string }>
      columns={columns}
      rows={rows}
      rowKey="id"
      detailPath="/app/starships"
      onSelectionChange={(selected) => {
        console.log("Selected starships:", selected);
      }}
    />
  );
};

export default StarshipsPage;
