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
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
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
  const [seleteName, setSelectedName] = React.useState({
    name: "",
    id: "",
  });
  const [D, setD] = React.useState("");
  const { loading, data, error, refetch } = useQuery(gql`
    query {
      get_client {
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

  const [_data, setData] = React.useState(
    applyPagination(data?.get_client || [], page, rowsPerPage)
  );
  React.useEffect(() => {
    return setData(applyPagination(data?.get_client || [], page, rowsPerPage));
  }, [page, rowsPerPage, data]);
  const [deleteStudent, { loading: loo, data: d, error: er }] = useMutation(gql`
    mutation delete_client($id: ID) {
      delete_client(id: $id) {
        id
      }
    }
  `);

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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      ID
                    </Typography>
                  </TableCell>
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
                      <Typography
                        flexWrap={"wrap"}
                        sx={{ fontWeight: theme.typography.fontWeightBold }}
                      >
                        {v.id}
                      </Typography>
                    </TableCell>

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
            count={data.get_client.length}
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
                  deleteStudent({
                    variables: {
                      id: seleteName.id,
                    },
                  }).then((e) => {
                    setDialog(false);
                    refetch();
                  });
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
