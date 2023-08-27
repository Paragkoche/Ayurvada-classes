import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "./Layout";
import MainCard from "@/Components/MainCard";
import AnimateButton from "@/Components/extr/AnimateButton";
import { useRouter } from "next/router";
import { getAllCourse, getAllCourse_you_pay } from "@/api";
const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const [error, setError] = useState<{
    message?: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    AllClass: any[];
    PayClass: any[];
  }>({
    AllClass: [],
    PayClass: [],
  });
  useEffect(() => {
    getAllCourse().then(
      (allC) => {
        setData((s) => ({ ...s, AllClass: JSON.parse(allC.data).data }));
        getAllCourse_you_pay()
          .then(
            (AllcP) => {
              setData((s) => ({ ...s, PayClass: JSON.parse(AllcP.data).data }));
            },
            (error) => {
              setError({ message: error.response.data.message });
            }
          )
          .finally(() => setLoading(false));
      },
      (error) => {
        setError({ message: error.response.data.message });
      }
    );
  }, []);
  console.log(data);

  return (
    <>
      {error ? (
        <Snackbar open autoHideDuration={5000} message={error.message} />
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        data && (
          <>
            <MainCard
              title="Your purchased course"
              sx={{
                marginBottom: "20px",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {data.PayClass.map((v: any) => (
                  <Card
                    sx={{
                      border: "1px solid",
                      borderColor: theme.palette.primary.light,
                      widows: "500px",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      // width={200}
                      height={200}
                      sx={{
                        objectFit: "cover",
                      }}
                      src={v.class.photo}
                    />
                    <CardContent>
                      <Typography>
                        {v.class.name} - End on{" "}
                        {new Date(v.endAt).toDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() =>
                          router.push("/users/video/" + v.class.id)
                        }
                      >
                        Watch Video
                      </Button>
                    </CardActions>
                  </Card>
                ))}
                {data.PayClass.length == 0 && (
                  <Typography>You did not purchase any classes.</Typography>
                )}
              </Box>
            </MainCard>
            <MainCard title="All Courses">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {(data.AllClass as any[]).map((v: any) => (
                  <Card
                    sx={{
                      border: "1px solid",
                      borderColor: theme.palette.primary.light,
                      widows: "500px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      // width={200}
                      height={200}
                      sx={{
                        objectFit: "cover",
                      }}
                      src={v.photo}
                    />
                    <CardContent>
                      <Typography>
                        {v.name} - Duration "
                        {(v.end_on as string).replace("d", " Days")}"
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => router.push("/pay/" + v.class.id)}>
                        Buy Just {v.pay} ₹
                      </Button>
                    </CardActions>
                  </Card>
                ))}
                {data.AllClass.length == 0 && (
                  <Typography>No Classes</Typography>
                )}
              </Box>
            </MainCard>
          </>
        )
      )}
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
