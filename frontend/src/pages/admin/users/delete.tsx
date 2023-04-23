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
import AnimateButton from "@/Components/extr/AnimateButton";
import { useTheme } from "@emotion/react";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

export default () => {
  const theme: any = useTheme();
  const [studentId, setStudentId] = React.useState("");
  const [dis, setDis] = React.useState(false);
  const [deleteStudent, { loading: loo, data: d, error: er }] = useMutation(gql`
    mutation delete_client($id: ID) {
      delete_client(id: $id) {
        id
      }
    }
  `);
  return (
    <Layout>
      <MainCard title="Delete Student">
        <Box px={20} py={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteStudent({
                variables: {
                  id: studentId,
                },
              })
                .then((e) => {
                  if (!e.data) {
                    return;
                  }
                  alert("Student Deleted");
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
              <InputLabel>Student ID</InputLabel>
              <OutlinedInput
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                }}
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
                Delete
              </Button>
            </AnimateButton>
          </form>
        </Box>
      </MainCard>
    </Layout>
  );
};
