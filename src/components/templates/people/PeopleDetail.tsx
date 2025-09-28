import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchPersonById } from "../../../api/xhrHelpers";
import { clearSelected } from "../../../redux/slices/DataSlice";
import type { AppDispatch, RootState } from "../../../redux/store";

const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedPerson, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    if (id) dispatch(fetchPersonById(id));
    return () => {
      dispatch(clearSelected());
    };
  }, [id, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!selectedPerson) return null;

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
        {selectedPerson.name}
      </Typography>
      <Typography>Gender: {selectedPerson.gender}</Typography>
      <Typography>Skin Color: {selectedPerson.skin_color}</Typography>
      <Typography>Height: {selectedPerson.height}</Typography>
    </Box>
  );
};

export default PeopleDetail;
