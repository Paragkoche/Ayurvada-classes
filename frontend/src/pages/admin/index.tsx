import { Grid, useTheme } from "@mui/material";
import Layout from "./Layout";
import User from "@/Components/Admin/components/user";
import React from "react";
import Classes from "@/Components/Admin/components/classes";
import Teachers from "@/Components/Admin/components/teachers";

const Page = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <User />
              {/* <EarningCard isLoading={isLoading} /> */}
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Classes />
              {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Teachers />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
