import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchSpeciesById } from "../../../api/xhrHelpers";
import { clearSelected } from "../../../redux/slices/DataSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import speciesImg from "../../../assets/species-cover.png";

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
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-blue-500 mb-4"
      >
        <IoIosArrowBack />
        <Typography variant="body2">Back</Typography>
      </div>

      <div className="flex flex-col ss:flex-row gap-8">
        <Box
          component="img"
          src={speciesImg}
          alt={selectedSpecies.name}
          sx={{
            width: { xs: "200px", sm: "250px" },
            height: "auto",
            borderRadius: "8px",
            boxShadow: 2,
          }}
        />
        <div>
          <Typography variant="h3" fontWeight="bold" mt={2}>
            {selectedSpecies.name}
          </Typography>
          <Typography>Designation: {selectedSpecies.designation}</Typography>
          <Typography>Language: {selectedSpecies.language}</Typography>
          <Typography>Life Span: {selectedSpecies.average_lifespan}</Typography>
        </div>
      </div>
    </Box>
  );
};

export default SpeciesDetail;
