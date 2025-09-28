import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchPeople } from "../api/xhrHelpers";
import type { People } from "../types/common.types";
import DataTable from "../components/DataTable";
import { extractIdFromUrl } from "../utils/hooks/helpers";

const columns = [
  { id: "name", label: "Name" },
  { id: "gender", label: "Gender" },
  { id: "birth_year", label: "Birth Year" },
  { id: "hair_color", label: "Hair Color" },
  { id: "height", label: "Height" },
];

const PeoplePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { people, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchPeople());
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
        Failed to load People: {error}
      </Typography>
    );
  }

  const rows = people.map((person) => ({
    ...person,
    id: extractIdFromUrl(person.url),
  }));

  return (
    <DataTable<People & { id: string }>
      columns={columns}
      rows={rows}
      rowKey="id"
      detailPath="/app/people"
      onSelectionChange={(selected) => {
        console.log("Selected people:", selected);
      }}
    />
  );
};

export default PeoplePage;
