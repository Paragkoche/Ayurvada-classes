import {
  Container,
  Typography,
  Paper,
  CardMedia,
  CardHeader,
  CircularProgress,
  Card,
} from "@mui/material";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from "@mui/material";
import Layout from "../../Layout";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import { useRef } from "react";
import { CardContent } from "@mui/joy";
import { URL } from "@/api";

const Page = () => {
  const router = useRouter();
  const ref = useRef<APITypes>(null);
  const { videoID } = router.query;
  const { loading, data, error } = useQuery(
    gql`
      query get_video($id: ID) {
        get_video(id: $id) {
          id
          title
          photo
          disc
          link
          isZoomMeet
        }
      }
    `,
    {
      variables: {
        id: videoID,
      },
    }
  );
  return (
    <>
      {loading || !data ? (
        <CircularProgress />
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <Card>
            <CardContent>
              {data.get_video.isZoomMeet ? (
                <iframe
                  style={{
                    outline: "none",
                    border: "none",
                    width: "100%",
                    height: "100%",
                  }}
                  allow="camera; microphone"
                  src={data.get_video.link}
                ></iframe>
              ) : (
                <Plyr
                  ref={ref}
                  source={{
                    type: "video",
                    poster: data.get_video.photo,
                    sources: [
                      {
                        src: URL + data.get_video.link,
                        provider: "html5",
                      },
                    ],
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Container>
      )}
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
