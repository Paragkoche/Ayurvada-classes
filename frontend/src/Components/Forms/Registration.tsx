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
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Joi from "joi";
import { Formik } from "formik";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AnimateButton from "../extr/AnimateButton";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { StudentRegister } from "@/api";

const FirebaseLogin = ({ ...others }) => {
  const router = useRouter();
  const theme: any = useTheme();
  const [checked, setChecked] = useState(true);

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

  const validationSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .max(225)
      .required(),
    name: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    age: Joi.number().required(),
    gender: Joi.string().max(255).required(),

    submit: Joi.any(),
  });

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
          email: "",
          name: "",
          password: "",
          age: 0,
          gender: "Male",
          submit: null,
        }}
        validate={(values) => {
          const validationResult = validationSchema.validate(values, {
            abortEarly: false,
          });
          if (validationResult.error) {
            return validationResult.error.details.reduce((errors, error) => {
              return {
                ...errors,
                [error.path[0]]: error.message,
              };
            }, {});
          }
          return {};
        }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
          StudentRegister({ ...values })
            .then(
              (e) => {
                console.log(e.data);

                console.log(e.data);
                localStorage.setItem("email", values.email);
                router.push("/otp");
              },
              (err) => {
                console.log(err);

                setStatus({ success: false });
                setErrors({ submit: err.response.data.message });
                setSubmitting(false);
              }
            )
            .finally(() => {
              setSubmitting(false);
            });
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
                <Select
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="gender"
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
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
            {/* <FormControl
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
            </FormControl> */}
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
