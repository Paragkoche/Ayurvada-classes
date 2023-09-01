import MainCard from "@/Components/MainCard";
import AnimateButton from "@/Components/extr/AnimateButton";
import { URL } from "@/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import markLogo from "../images/Mediamodifier-Design.svg";
import axios from "axios";
import Image from "next/image";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/router";
import React from "react";
const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh",
}));
export default () => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [password, setPassword] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const [dis, setDis] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  return (
    <AuthWrapper1>
      <Grid
        container
        direction={"column"}
        justifyContent={"flex-end"}
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
                              OTP
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={matchDownSM ? "center" : "inherit"}
                            >
                              Please enter your email address.
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setDis(true);
                          axios
                            .put(URL + "/password", {
                              email: sessionStorage.getItem("email"),
                              password,
                              otp,
                            })
                            .then(() => {
                              router.push("/login");
                            })
                            .catch((e) => alert(e.response.data.message))
                            .finally(() => {
                              setDis(false);
                            });
                        }}
                      >
                        <InputLabel htmlFor="outlined-adornment-email-login">
                          OTP
                        </InputLabel>
                        <FormControl
                          fullWidth
                          sx={{ ...theme.typography.customInput }}
                        >
                          <MuiOtpInput
                            value={otp}
                            length={4}
                            TextFieldsProps={{
                              type: "number",
                              placeholder: "-",
                              sx: {
                                "&::-webkit-outer-spin-button": {
                                  display: "none",
                                },
                                "&:::-webkit-outer-spin-button": {
                                  display: "none",
                                },
                              },
                            }}
                            onChange={(e) => setOtp(e)}
                          />
                          {error && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                            >
                              {error}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl
                          fullWidth
                          sx={{ ...theme.typography.customInput }}
                          error={error !== ""}
                        >
                          <InputLabel htmlFor="outlined-adornment-email-login">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShow((s) => !s)}
                                  onMouseDown={() => setShow((s) => !s)}
                                  edge="end"
                                  size="large"
                                >
                                  {show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                            type={!show ? "password" : "name"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {error && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                            >
                              {error}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <AnimateButton sx>
                          <Button
                            disableElevation
                            fullWidth
                            disabled={dis}
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ my: 2 }}
                            color="secondary"
                          >
                            Set password
                          </Button>
                        </AnimateButton>
                      </form>
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
