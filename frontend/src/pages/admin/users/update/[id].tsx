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
const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "60vh",
}));
const update = () => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const route = useRouter();
  const { data, loading, error, refetch } = useQuery(gql`
   query{ 
      get_client_id(id: "${route.query.id}") {
        email
        name
        age
        gender
      }
    }
  `);
  const [update_user, { loading: lo, error: er, data: dd }] = useMutation(gql`
    mutation update_user(
      $name: String
      $id: String
      $email: String
      $age: String
      $gender: User_Gander
      $password: String
    ) {
      update_user(
        name: $name
        id: $id
        email: $email
        age: $age
        gender: $gender
        password: $password
      ) {
        id
        name
        email
        age
        gender
        role
        is_active
      }
    }
  `);
  const [fromData, setFromData] = React.useState<any>();
  console.log(fromData);
  React.useEffect(() => {
    setFromData(data);
  }, [data]);
  return (
    !loading &&
    data &&
    fromData && (
      <Layout>
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
                            update_user({
                              variables: {
                                ...fromData.get_client_id,
                                id: route.query.id,
                              },
                            }).finally(() => {
                              refetch();
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
                                setFromData((s: any) => ({
                                  get_client_id: {
                                    ...s.get_client_id,
                                    email: e.target.value,
                                  },
                                }));
                              }}
                              value={fromData.get_client_id.email}
                            />
                          </FormControl>
                          <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput
                              onChange={(e) => {
                                setFromData((s: any) => ({
                                  get_client_id: {
                                    ...s.get_client_id,
                                    name: e.target.value,
                                  },
                                }));
                              }}
                              value={fromData.get_client_id.name}
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
                                setFromData((s: any) => ({
                                  get_client_id: {
                                    ...s.get_client_id,
                                    password: e.target.value,
                                  },
                                }));
                              }}
                              value={fromData.get_client_id.password}
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
                                  setFromData((s: any) => ({
                                    get_client_id: {
                                      ...s.get_client_id,
                                      age: e.target.value,
                                    },
                                  }));
                                }}
                                value={fromData.get_client_id.age}
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
                                  setFromData((s: any) => ({
                                    get_client_id: {
                                      ...s.get_client_id,
                                      gender: e.target.value,
                                    },
                                  }));
                                }}
                                value={fromData.get_client_id.gender}
                                sx={{ ...theme.typography.customInput }}
                              >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </Stack>
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
      </Layout>
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
export default update;
