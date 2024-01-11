import { SxProps, Theme, Typography } from "@mui/material";

interface Props {
  percentage: number;
  sx?: SxProps<Theme>;
}

const PercentageChanged = ({ percentage, sx }: Props) => {
  const arrow = percentage > 0 ? "↑" : "↓";
  const color = percentage > 0 ? "green" : "red";
  return (
    <Typography color={color} sx={sx}>
      ({arrow}
      {percentage}%)
    </Typography>
  );
};

export default PercentageChanged;
