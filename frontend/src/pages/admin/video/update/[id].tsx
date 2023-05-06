import MainCard from "@/Components/MainCard";
import Layout from "../../Layout";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AnimateButton from "@/Components/extr/AnimateButton";
import { NextComponentType, NextPage } from "next";
import { gql, useMutation, useQuery } from "@apollo/client";
import { client } from "@/api";
import { EnumType } from "typescript";
import React from "react";
import { useRouter } from "next/router";
import { date } from "yup";
import FileUpload from "react-mui-fileuploader";
const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "60vh",
}));
const Page = () => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const route = useRouter();
  const { data, loading, error, refetch } = useQuery(gql`
   query{ 
    get_video(id: "${route.query.id}") {
       id
       title 
       photo
       disc

      }
    }
  `);
  const [update_user, { loading: lo, error: er, data: dd }] = useMutation(gql`
    mutation update_video(
      $title: String
      $id: ID
      $photo: String
      $dic: String
    ) {
      update_video(title: $title, id: $id, photo: $photo, disc: $dic) {
        id
      }
    }
  `);
  const [fromData, setFromData] = React.useState<any>();
  console.log(fromData);
  const router = useRouter();
  React.useEffect(() => {
    setFromData(data);
  }, [data]);
  return (
    !loading &&
    data &&
    fromData && (
      <>
        <AuthWrapper1>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{ minHeight: "60vh" }}
          >
            <Grid item xs={12}>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ minHeight: "calc(60vh - 68px)" }}
              >
                <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                  <MainCard
                    sx={{
                      maxWidth: { xs: 400, lg: 475 },
                      margin: { xs: 2.5, md: 3 },
                      "& > *": {
                        flexGrow: 1,
                        flexBasis: "50%",
                      },
                    }}
                    content={false}
                  >
                    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction={matchDownSM ? "column-reverse" : "row"}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item>
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                spacing={1}
                              >
                                <Typography
                                  color={theme.palette.secondary.main}
                                  gutterBottom
                                  variant={matchDownSM ? "h3" : "h2"}
                                >
                                  Update Video
                                </Typography>
                                <Typography
                                  variant="caption"
                                  fontSize="16px"
                                  textAlign={matchDownSM ? "center" : "inherit"}
                                >
                                  Enter Video Information
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            spacing={2}
                          >
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Divider
                                  sx={{ flexGrow: 1 }}
                                  orientation="horizontal"
                                />
                                <Divider
                                  sx={{ flexGrow: 1 }}
                                  orientation="horizontal"
                                />
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              container
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">
                                  Update Video
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            update_user({
                              variables: {
                                ...fromData.get_video,
                                id: route.query.id,
                              },
                            })
                              .then(() => {
                                router.push("/admin/video/");
                              })
                              .finally(() => {
                                refetch();
                              });
                          }}
                        >
                          <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>Title</InputLabel>
                            <OutlinedInput
                              label="title"
                              onChange={(e) => {
                                setFromData((s: any) => ({
                                  get_video: {
                                    ...s.get_video,
                                    title: e.target.value,
                                  },
                                }));
                              }}
                              value={fromData.get_video.title}
                            />
                          </FormControl>

                          <FileUpload
                            acceptedType="image/*"
                            getBase64
                            onFilesChange={(e) => {
                              if (e.length !== 0)
                                setFromData((s: any) => ({
                                  get_video: {
                                    ...s.get_video,
                                    photo: e[0].path,
                                  },
                                }));
                            }}
                          />
                          <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>description</InputLabel>
                            <OutlinedInput
                              label="description"
                              onChange={(e) => {
                                setFromData((s: any) => ({
                                  get_video: {
                                    ...s.get_video,
                                    disc: e.target.value,
                                  },
                                }));
                              }}
                              value={fromData.get_video.disc}
                            />
                          </FormControl>

                          <Box>
                            <AnimateButton>
                              <Button
                                disableElevation
                                disabled={lo}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                              >
                                Update
                              </Button>
                            </AnimateButton>
                          </Box>
                        </form>
                      </Grid>
                    </Box>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AuthWrapper1>
      </>
    )
  );
};

// update.getInitialProps = async ({ req, query }) => {
//   console.log(query);

//   const { data } = await client.query({
//     query: gql`

//   `,
//   });
//   return { data };
// };
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
