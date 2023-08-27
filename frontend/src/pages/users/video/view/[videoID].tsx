import {
  Container,
  Typography,
  Paper,
  CardMedia,
  CardHeader,
  CircularProgress,
  Card,
  Stack,
  IconButton,
  CardActionArea,
  Divider,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import Layout from "../../Layout";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect, useRef, useState } from "react";
import { CardContent } from "@mui/joy";
import { URL, getVideo, post_video_command } from "@/api";
import {
  BorderBottom,
  DocumentScanner,
  Pageview,
  Send,
} from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import Comment from "@/Components/Commend";
const Page = () => {
  const router = useRouter();
  const ref = useRef<APITypes>(null);
  const { videoID } = router.query;
  const [error, setError] = useState<{
    message?: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    data: any;
  }>();
  useEffect(() => {
    if (videoID)
      getVideo(videoID as string)
        .then(
          (data) => {
            setData(JSON.parse(data.data));
          },
          (error) => {
            setError({ message: error.response.data.message });
          }
        )
        .finally(() => setLoading(false));
  }, [videoID]);
  const [comment, setComment] = useState<string>("");
  console.log(data);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <>
      {loading || !data ? (
        <CircularProgress />
      ) : (
        data && (
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
              <CardMedia>
                <Plyr
                  ref={ref}
                  source={{
                    type: "video",
                    poster: data.data.photo,
                    sources: [
                      {
                        src: `${URL}/${(data.data.link as string).replace(
                          " ",
                          ""
                        )}`,
                        provider: "html5",
                      },
                    ],
                  }}
                />
              </CardMedia>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={20}
                  padding={5}
                >
                  <Typography variant="h2">{data.data.title}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <IconButton>
                        <FavoriteBorder />
                      </IconButton>
                      {formatter.format(data.data.Likes.length)}
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <IconButton>
                        <Pageview />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <Container sx={{ py: 2 }}>
                <Stack direction="column" spacing={5} padding={5}>
                  <Typography>Commend</Typography>
                  <FormControl>
                    <InputLabel>Comment</InputLabel>
                    <OutlinedInput
                      multiline
                      label="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              post_video_command(data.data.id, comment).then(
                                () => {
                                  getVideo(videoID as string).then(
                                    (data) => {
                                      setData(JSON.parse(data.data));
                                    },
                                    (error) => {
                                      setError({
                                        message: error.response.data.message,
                                      });
                                    }
                                  );
                                }
                              );
                            }}
                          >
                            <Send />
                          </IconButton>
                        </InputAdornment>
                      }
                    ></OutlinedInput>
                  </FormControl>
                </Stack>
                <Divider />
                {data.data.Comments.map((v: any) => (
                  <Comment key={v.id} comment={v} />
                ))}
              </Container>
              <Divider />
            </Card>
          </Container>
        )
      )}
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
