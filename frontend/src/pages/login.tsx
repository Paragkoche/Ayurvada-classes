// material-ui
import MainCard from "@/Components/MainCard";
import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import markLogo from "../images/Mediamodifier-Design.svg";
import FromsLogin from "../Components/Forms/Login";
// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh",
}));

export default () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ minHeight: "calc(100vh - 68px)" }}
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
                    <Grid item sx={{ mb: 3 }}>
                      <Link href={"/"}>
                        <Image
                          style={{ width: "100%", height: "100px" }}
                          src={markLogo}
                          alt="logo"
                        />
                      </Link>
                    </Grid>
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
                              Hi, Welcome Back
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={matchDownSM ? "center" : "inherit"}
                            >
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FromsLogin />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                        xs={12}
                      >
                        <Typography
                          component={Link}
                          href="/register"
                          variant="subtitle1"
                          sx={{ textDecoration: "none" }}
                        >
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};
