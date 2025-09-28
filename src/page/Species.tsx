import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchSpecies } from "../api/xhrHelpers";
import type { Species } from "../types/common.types";
import DataTable from "../components/DataTable";
import { extractIdFromUrl } from "../utils/hooks/helpers";

const columns = [
  { id: "name", label: "Name" },
  { id: "classification", label: "Classification" },
  { id: "eye_colors", label: "Eye Colors" },
  { id: "hair_color", label: "Hair Color" },
  { id: "average_height", label: "Height" },
];

const SpeciesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { species, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchSpecies());
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
        Failed to load Species: {error}
      </Typography>
    );
  }

  const rows = species.map((species) => ({
    ...species,
    id: extractIdFromUrl(species.url),
  }));

  return (
    <DataTable<Species & { id: string }>
      columns={columns}
      rows={rows}
      rowKey="id"
      detailPath="/app/species"
      onSelectionChange={(selected) => {
        console.log("Selected species:", selected);
      }}
    />
  );
};

export default SpeciesPage;
