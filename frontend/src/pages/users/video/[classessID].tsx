import {
  Box,
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

const Page = () => {
  const router = useRouter();
  const { classessID } = router.query;
  const { loading, data, error } = useQuery(
    gql`
      query get_classes_by_id($id: ID) {
        get_classes_by_id(id: $id) {
          lecher {
            id
            title
            is48h
            photo
          }
        }
      }
    `,
    {
      variables: {
        id: classessID,
      },
    }
  );
  return (
    <>
      {loading && !data ? (
        <CircularProgress />
      ) : (
        data && (
          <MainCard title="All Videos">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {(data.get_classes_by_id.lecher as any[])
                .filter((v) => {
                  console.log(
                    new Date(v.is48h).getDate(),
                    new Date().getDate(),
                    new Date(v.is48h).getMonth(),
                    new Date().getMonth(),
                    new Date(v.is48h).getHours(),
                    new Date().getHours()
                  );

                  return (
                    new Date(v.is48h).getDate() > new Date().getDate() &&
                    new Date(v.is48h).getMonth() > new Date().getMonth() &&
                    new Date(v.is48h).getHours() > new Date().getHours()
                  );
                })
                .map((v: any) => (
                  <Card sx={{ widows: "500px", cursor: "pointer" }}>
                    <CardMedia component="img" height={200} src={v.photo} />
                    <CardContent>
                      <Typography>{v.title}</Typography>
                    </CardContent>
                    <CardActions>
                      <Link href={"/users/video/view/" + v.id}>
                        watch video{" "}
                        {v.isLiveNow ? (
                          <Typography color="red">Live</Typography>
                        ) : null}
                      </Link>
                    </CardActions>
                  </Card>
                ))}
              {data.get_classes_by_id.lecher.length == 0 && (
                <Typography>No videos</Typography>
              )}
            </Box>
          </MainCard>
        )
      )}
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
