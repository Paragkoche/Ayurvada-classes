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
import { client } from "@/api";
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
  const { data, loading, error, refetch } = useQuery(gql`
   query{ 
      get_client_id(id: "${route.query.id}") {
        id
        email
        name
        age
        gender
      }
     
    }
  `);
  const {
    data: _data,
    loading: _loading,
    error: _error,
    refetch: _s,
  } = useQuery(gql`
    query {
      get_all_classes {
        id
        name
        PayUser {
          id
        }
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
      $isPayfor: [Classes_ids!]!
    ) {
      update_user(
        name: $name
        id: $id
        email: $email
        age: $age
        gender: $gender
        password: $password
        isPayfor: $isPayfor
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
  const [fromData_class, setFromData_class] = React.useState<any[]>([]);
  console.log(fromData, fromData_class);
  React.useEffect(() => {
    if (data && _data) {
      setFromData(data);
      setFromData_class((s) => [
        ...s,
        ...(_data.get_all_classes as any[]).map((v) => {
          let a = true;
          v.isPayfor?.map((vv: any) => {
            a = vv.id == data.get_client_id.id;
          });
          if (a) return v;
        }),
      ]);
    }
    // setFromData_class(_data);
  }, [data, _data]);
  return (
    !loading &&
    !_loading &&
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
                                isPayfor: [
                                  ...fromData_class.map((v) => {
                                    delete v.name;
                                    return v;
                                  }),
                                ],
                                id: route.query.id,
                              },
                            })
                              .then(() => {
                                route.push("/admin/users");
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
                              value={fromData?.get_client_id.email}
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
                          <FormControl
                            fullWidth
                            sx={{ mt: 2 }}
                            // sx={{ ...theme.typography.customInput }}
                          >
                            <FormLabel>Classes</FormLabel>
                            <MultiSelect
                              getOptionLabel={(value: any) => value.name}
                              getOptionKey={(value: any): string => value.id}
                              options={_data?.get_all_classes.map((v: any) => ({
                                id: v.id,
                                name: v.name,
                              }))}
                              value={fromData_class}
                              onChange={(value) => {
                                setFromData_class(value);
                                console.log(value);
                              }}
                            ></MultiSelect>
                          </FormControl>
                          <br />
                          <Box sx={{ mt: 5 }}>
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
update.getLayout = (page: any) => <Layout>{page}</Layout>;

export default update;
