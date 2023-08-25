import { Grid, useTheme } from "@mui/material";
import Layout from "./Layout";
import User from "@/Components/Admin/components/user";
import React, { useEffect, useState } from "react";
import Classes from "@/Components/Admin/components/classes";
import Teachers from "@/Components/Admin/components/teachers";
import { Admin_home } from "@/api";
import Storage from "@/Components/Admin/components/storage";
const Page = () => {
  const [error, setError] = useState<{
    message?: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    storage: {
      available: string;
      free: string;
      total: string;
    };
    Students: {
      count: number;
    };
    Classes: {
      count: number;
    };
    videos: {
      count: number;
    };
    Admins: {
      count: number;
    };
    Teachers: {
      count: number;
    };
  }>();

  useEffect(() => {
    Admin_home()
      .then(
        (data) => {
          console.log(data);

          setData(data.data.data);
        },
        (error) => {
          setError({ message: error.response.data.message });
        }
      )
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Grid container spacing={30}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <User
                loading={loading}
                error={{ message: error?.message }}
                data={data?.Students.count}
              />
              {/* <EarningCard isLoading={isLoading} /> */}
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Classes
                loading={loading}
                error={{ message: error?.message }}
                data={data?.Classes.count}
              />
              {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Teachers
                loading={loading}
                error={{ message: error?.message }}
                data={data?.Teachers.count}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Storage free={data?.storage.free} total={data?.storage.total} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
