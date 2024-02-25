import React from "react";
import { Grid, Box } from "@mui/material";
import SalesOverview from "../../../components/dashboard/SalesOverview";
import DailyActivities from "../../../components/dashboard/DailyActivities";
import ProductPerformance from "../../../components/dashboard/ProductPerformance";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivities />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
      </Grid>
    </Box>
  );
};

export default Dashboard1;
