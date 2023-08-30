import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { addUser } from "@/api";
import AnimateButton from "@/Components/extr/AnimateButton";
import { useTheme } from "@emotion/react";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const Page = () => {
  const theme: any = useTheme();
  const [data, setData] = React.useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    password: "",
  });
  const [dis, setDis] = React.useState(false);

  return (
    <>
      <MainCard title="Create User">
        <Box px={20} py={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDis(true);
              addUser(data)
                .then(({ data }) => {
                  alert("User Add");
                  setData({
                    name: "",
                    email: "",
                    age: "",
                    gender: "",
                    password: "",
                  });
                })

                .finally(() => {
                  setDis(false);
                });
            }}
          >
            <FormControl
              fullWidth
              sx={{
                ...theme.typography.customInput,
              }}
            >
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={data.name}
                onChange={(e) => {
                  setData((s) => ({ ...s, name: e.target.value }));
                }}
                required
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                ...theme.typography.customInput,
              }}
            >
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                value={data.email}
                onChange={(e) => {
                  setData((s) => ({ ...s, email: e.target.value }));
                }}
                required
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                ...theme.typography.customInput,
              }}
            >
              <InputLabel>Age</InputLabel>
              <OutlinedInput
                value={data.age}
                onChange={(e) => {
                  setData((s) => ({ ...s, age: e.target.value }));
                }}
                type="number"
                required
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                ...theme.typography.customInput,
              }}
            >
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                value={data.gender}
                onChange={(e) => {
                  setData((s) => ({ ...s, gender: e.target.value }));
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                ...theme.typography.customInput,
              }}
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                value={data.password}
                onChange={(e) => {
                  setData((s) => ({ ...s, password: e.target.value }));
                }}
                type="password"
                required
              />
            </FormControl>
            <AnimateButton>
              <Button
                fullWidth
                disabled={dis}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </AnimateButton>
          </form>
        </Box>
      </MainCard>
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
