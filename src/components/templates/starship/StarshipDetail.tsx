import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchStarshipById } from "../../../api/xhrHelpers";
import { clearSelected } from "../../../redux/slices/DataSlice";
import type { AppDispatch, RootState } from "../../../redux/store";

const StarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedStarship, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    if (id) dispatch(fetchStarshipById(id));
    return () => {
      dispatch(clearSelected());
    };
  }, [id, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!selectedStarship) return null;

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
        {selectedStarship.name}
      </Typography>
      <Typography>Model: {selectedStarship.model}</Typography>
      <Typography>Passengers: {selectedStarship.passengers}</Typography>
      <Typography>Pilots: {selectedStarship.pilots}</Typography>
    </Box>
  );
};

export default StarshipDetail;
