import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchSpeciesById } from "../../../api/xhrHelpers";
import { clearSelected } from "../../../redux/slices/DataSlice";
import type { AppDispatch, RootState } from "../../../redux/store";

const SpeciesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedSpecies, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    if (id) dispatch(fetchSpeciesById(id));
    return () => {
      dispatch(clearSelected());
    };
  }, [id, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!selectedSpecies) return null;

  return (
    <Box>
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-blue-500"
      >
        <IoIosArrowBack />
        <Typography variant="body2">Back</Typography>
      </div>
      <Typography variant="h3" fontWeight="bold" mt={2}>
        {selectedSpecies.name}
      </Typography>
      <Typography>Designation: {selectedSpecies.designation}</Typography>
      <Typography>Language: {selectedSpecies.language}</Typography>
      <Typography>Life Span: {selectedSpecies.average_lifespan}</Typography>
    </Box>
  );
};

export default SpeciesDetail;
