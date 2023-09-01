import MainCard from "@/Components/MainCard";
import Layout from "../../Layout";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
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
import { one_user, update_user } from "@/api";
import { EnumType } from "typescript";
import React from "react";
import { useRouter } from "next/router";
import { date } from "yup";
import { MultiSelect } from "react-mui-multi-select";
const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "60vh",
}));
const update = () => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const route = useRouter();
  const { id }: any = route.query;
  React.useEffect(() => {
    try {
      if (id)
        one_user(id).then(({ data }) => {
          console.log(data);

          setData({ ...data.data, password: undefined });
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  const [data, setData] = React.useState<any>();

  const [isSubmitting, setisSubmitting] = React.useState(false);

  return (
    data && (
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
                                  Update student
                                </Typography>
                                <Typography
                                  variant="caption"
                                  fontSize="16px"
                                  textAlign={matchDownSM ? "center" : "inherit"}
                                >
                                  Enter student credentials to continue
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
                                  Update User
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setisSubmitting(true);
                            update_user(
                              {
                                name: data.name,
                                password: data.password,
                                age: data.age,
                                gender: data.gender,
                              },
                              id
                            )
                              .then(() => {
                                route.push("/admin/users");
                              })
                              .catch((e) => {
                                alert(e.response.data.message);
                              })
                              .finally(() => {
                                setisSubmitting(false);
                              });
                          }}
                        >
                          <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                              disabled
                              label="Email Address"
                              onChange={(e) => {
                                setData((s: any) => ({
                                  ...s,
                                  email: e.target.value,
                                }));
                              }}
                              value={data.email}
                            />
                          </FormControl>
                          <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput
                              onChange={(e) => {
                                setData((s: any) => ({
                                  ...s,
                                  name: e.target.value,
                                }));
                              }}
                              value={data.name}
                              label="Name"
                            />
                          </FormControl>
                          <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                              label="Password"
                              onChange={(e) => {
                                setData((s: any) => ({
                                  ...s,
                                  password: e.target.value,
                                }));
                              }}
                              value={data.password ? data.password : ""}
                            />
                          </FormControl>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <FormControl
                              sx={{ ...theme.typography.customInput }}
                            >
                              <InputLabel htmlFor="outlined-adornment-age-login">
                                Age
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-age-login"
                                type="text"
                                name="age"
                                label="Age"
                                onChange={(e) => {
                                  setData((s: any) => ({
                                    ...s,
                                    age: e.target.value,
                                  }));
                                }}
                                value={data.age}
                              />
                            </FormControl>
                            <FormControl
                              fullWidth
                              sx={{ ...theme.typography.customInput }}
                            >
                              <InputLabel htmlFor="outlined-adornment-age-login">
                                Gander
                              </InputLabel>
                              <Select
                                onChange={(e) => {
                                  setData((s: any) => ({
                                    ...s,
                                    gender: e.target.value,
                                  }));
                                }}
                                value={data.gender}
                                sx={{ ...theme.typography.customInput }}
                              >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </Stack>

                          <Box sx={{ mt: 5 }}>
                            <AnimateButton>
                              <Button
                                disableElevation
                                disabled={isSubmitting}
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
update.getLayout = (page: any) => <Layout>{page}</Layout>;

export default update;
