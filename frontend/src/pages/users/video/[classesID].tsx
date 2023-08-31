import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import Layout from "../Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import MainCard from "@/Components/MainCard";
import { useEffect, useState } from "react";
import { getAllVideo } from "@/api";

const Page = () => {
  const router = useRouter();
  const { classesID }: any = router.query;
  const [error, setError] = useState<{
    message?: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    data: any[];
  }>();
  useEffect(() => {
    if (classesID)
      getAllVideo(classesID)
        .then(
          (data) => {
            setData(JSON.parse(data.data));
          },
          (error) => {
            setError({ message: error.response.data.message });
          }
        )
        .finally(() => setLoading(false));
  }, [classesID]);
  console.log(data);
  const route = useRouter();
  return (
    <>
      {loading && !data ? (
        <CircularProgress />
      ) : (
        data && (
          <MainCard title="All Videos">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {(data.data as any[]).map((v: any) => (
                <Card sx={{ widows: "500px", cursor: "pointer" }}>
                  <CardMedia component="img" height={200} src={v.photo} />
                  <CardContent>
                    <Typography>{v.title}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => router.push("/users/video/view/" + v.id)}
                    >
                      watch video{" "}
                      {v.isLiveNow ? (
                        <Typography color="red">Live</Typography>
                      ) : null}
                    </Button>
                  </CardActions>
                </Card>
              ))}
              {data.data.length == 0 && <Typography>No videos</Typography>}
            </Box>
          </MainCard>
        )
      )}
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
