import { Box, Button, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";

interface Props {
  tabs: { label: string; value: string }[];
  value: string;
  handleChange: (value: any) => void;
}

const ChartSwitcher = ({ tabs, value, handleChange }: Props) => {
  return (
    <Box
      display="flex"
      gap="12px"
      bgcolor="#00000014"
      padding="4px 10px"
      borderRadius="30px"
      fontSize={12}
    >
      {tabs.map((tab) => (
        <Box
          key={tab.value}
          onClick={() => handleChange(tab.value)}
          sx={{
            fontWeight: 500,
            cursor: "pointer",
            bgcolor: value === tab.value ? "black" : "",
            color: value === tab.value ? "white" : "",
            padding: "4px 12px",
            borderRadius: "30px",
          }}
        >
          {tab.label}
        </Box>
      ))}
    </Box>
  );
};

export default ChartSwitcher;
