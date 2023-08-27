import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
/*
  <IconButton title="Delete User">
        <Delete />
      </IconButton>
*/
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Stack,
  Container,
  Grid,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Table } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Add,
  Delete,
  TableChart,
  TableRows,
  Update,
  Search,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Users } from "@/api";
import AnimateButton from "@/Components/extr/AnimateButton";
export function applyPagination(
  documents: any,
  page: number,
  rowsPerPage: number
) {
  console.log(documents);

  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
const Page = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const theme = useTheme();
  const router = useRouter();
  const [dialog, setDialog] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [seleteName, setSelectedName] = React.useState<any>({ name: "" });
  const [D, setD] = React.useState("");
  const [data, _setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    Users()
      .then((data) => {
        _setData(data.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [_data, setData] = React.useState(
    applyPagination(data || [], page, rowsPerPage)
  );
  React.useEffect(() => {
    return setData(applyPagination(data || [], page, rowsPerPage));
  }, [page, rowsPerPage, data]);

  const handlePageChange = React.useCallback((event: any, value: any) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = React.useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    !loading &&
    data && (
      <>
        <MainCard
          secondary={
            <>
              <IconButton
                title="Add User"
                onClick={() => router.push("/admin/users/add")}
              >
                <Add />
              </IconButton>
            </>
          }
          title="All Students"
          content={true}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack>
              <FormControl>
                <InputLabel>Search</InputLabel>
                <OutlinedInput
                  label="Search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="name:<name of student>"
                  fullWidth={false}
                ></OutlinedInput>
              </FormControl>
            </Stack>

            <Stack>
              {["All"].map((v) => (
                <AnimateButton>
                  <Button
                    disableElevation
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    {v}
                  </Button>
                </AnimateButton>
              ))}
            </Stack>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Age
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Gender
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Active
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Delete
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Update
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_data.map((v: any) => (
                  <TableRow>
                    <TableCell>
                      <Typography flexWrap={"wrap"}>{v.name}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography flexWrap={"wrap"}>{v.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography flexWrap={"wrap"}>{v.age}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography flexWrap={"wrap"}>{v.gender}</Typography>
                    </TableCell>

                    <TableCell>
                      <Checkbox disabled checked={v.is_active} />
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          setD("Delete");
                          setSelectedName({
                            id: v.id,
                            name: v.name,
                          });
                          setDialog((s) => !s);
                        }}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="warning"
                        onClick={() => {
                          setD("Update");
                          setSelectedName({
                            id: v.id,
                            name: v.name,
                          });
                          setDialog((s) => !s);
                        }}
                      >
                        <Update />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </MainCard>
        <Dialog open={dialog}>
          <DialogTitle>Do you want to {D} this student?</DialogTitle>
          <DialogContent>
            <DialogContentText>NAME : {seleteName.name}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              onClick={() => {
                console.log(D);

                if (D == "Delete") {
                } else {
                  router.push("/admin/users/update/" + seleteName.id);
                }
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setDialog((s) => !s)}>No</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
