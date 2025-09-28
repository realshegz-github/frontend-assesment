import { Paper, Typography, Box } from "@mui/material";
import type { FC } from "react";
import { BiSolidCheckbox } from "react-icons/bi";

interface MetricCardProps {
  title: string;
  value: number;
  desc: string;
  color: string;
}
const MetricCard: FC<MetricCardProps> = ({ title, value, desc, color }) => (
  <Box className="w-full ss:w-max ">
    <Paper
      elevation={2}
      sx={{
        p: 2,
        backgroundColor: "#fff",
        borderRadius: "8px",
        // minWidth: { xs: "100%", sm: 209 },
      }}
    >
      <div className="flex justify-between gap-4">
        <div>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", mb: 2 }}
            color="text.secondary"
          >
            {title}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "16px" }}>
            {value}
          </Typography>
          <Typography
            variant="body2"
            className="text-[#00992B]"
            sx={{ fontSize: "10px" }}
          >
            {desc}
          </Typography>
        </div>

        <BiSolidCheckbox color={color} size={24} />
      </div>
    </Paper>
  </Box>
);

export default MetricCard;
