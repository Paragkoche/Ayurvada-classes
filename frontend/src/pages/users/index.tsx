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
import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "./Layout";
import MainCard from "@/Components/MainCard";
import AnimateButton from "@/Components/extr/AnimateButton";
import { useRouter } from "next/router";
const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const { loading, data, error } = useQuery(gql`
    query {
      get_all_classes {
        id
        name
        photo
        pay
      }
      get_assess_classes {
        id
        name
        photo
      }
    }
  `);

  return (
    <>
      {error ? (
        <Snackbar open autoHideDuration={5000} message={error.message} />
      ) : null}
      {loading && !data ? (
        <CircularProgress />
      ) : (
        <>
          <MainCard
            title="Your purchased course"
            sx={{
              marginBottom: "20px",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {data.get_assess_classes.map((v: any) => (
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
                    src={v.photo}
                  />
                  <CardContent>
                    <Typography>{v.name}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => router.push("/users/video/" + v.id)}>
                      Watch Video
                    </Button>
                  </CardActions>
                </Card>
              ))}
              {data.get_assess_classes.length == 0 && (
                <Typography>You did not purchase any classes.</Typography>
              )}
            </Box>
          </MainCard>
          <MainCard title="All Courses">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {(data.get_all_classes as any[])
                .filter((v) => {
                  let a = true;
                  data.get_assess_classes.map((vv: any) => {
                    a = v.id !== vv.id;
                  });
                  return a;
                })
                .map((v: any) => (
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
                      <Typography>{v.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => router.push("/pay/" + v.id)}>
                        Buy Just {v.pay} ₹
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              {data.get_all_classes.length == 0 && (
                <Typography>No Classes</Typography>
              )}
            </Box>
          </MainCard>
        </>
      )}
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
