import { useEffect, useRef, useState } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AnimateButton from "../extr/AnimateButton";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const FirebaseLogin = ({ ...others }) => {
  const router = useRouter();
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [checked, setChecked] = useState(true);
  const [add_Client, { data, loading, error }] = useMutation(gql`
    mutation Add_client(
      $name: String
      $password: String
      $email: String
      $contantNo: String
      $age: Int
      $gander: String
    ) {
      Add_client(
        name: $name
        profile_pic: ""
        password: $password
        email: $email
        constantNo: $contantNo
        age: $age
        gender: $gander
      ) {
        id
        pay
        pay_by
        is_pay
        name
        profile_pic
        email
        constantNo
        age
        gender
        role
        is_active
      }
    }
  `);
  const googleHandler = async () => {
    console.error("Login");
  };
  const fromSubmit = (values: any) => {};
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
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
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "abc@xyz.com",
          name: "XYZ",
          password: "...",
          contantNo: "+91 80XXXXXXX0",
          age: "8",
          gander: "Male",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);

          try {
            await add_Client({
              variables: { ...values, age: parseInt(values.age) },
            }).then(() => {
              localStorage.setItem("user", JSON.stringify(data.Add_client));
              router.push("/user");
            });
            setStatus({ success: true });

            setSubmitting(false);
          } catch (err: any) {
            console.log(error?.message);

            setStatus({ success: false });
            setErrors({ submit: error?.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }: any) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address "
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-name-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.name && errors.name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-name-login">
                Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-login"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Name"
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-name-login"
                >
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.contantNo && errors.contantNo)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-cc-login">
                Phone Number
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-cc-login"
                type="text"
                value={values.contantNo}
                name="contantNo"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Contact No"
                inputProps={{}}
              />
              {touched.contantNo && errors.contantNo && (
                <FormHelperText error id="standard-weight-helper-text-cc-login">
                  {errors.contantNo}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControl
                error={Boolean(touched.age && errors.age)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-age-login">
                  Age
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-age-login"
                  type="text"
                  value={values.age}
                  name="age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Age"
                  inputProps={{}}
                />
                {touched.age && errors.age && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-age-login"
                  >
                    {errors.age}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.age && errors.age)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-age-login">
                  Gander
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-age-login"
                  type="text"
                  value={values.gander}
                  name="gander"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Gander"
                  inputProps={{}}
                ></OutlinedInput>
                {touched.gander && errors.gander && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-gander-login"
                  >
                    {errors.gander}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <FormControl
              fullWidth
              error={Boolean(touched.contantNo && errors.contantNo)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-cc-login">
                Phone Number
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-cc-login"
                type="text"
                value={values.contantNo}
                name="contantNo"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Contact No"
                inputProps={{}}
              />
              {touched.contantNo && errors.contantNo && (
                <FormHelperText error id="standard-weight-helper-text-cc-login">
                  {errors.contantNo}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
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
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
