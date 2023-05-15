import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
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
  TablePagination,
  TableRow,
} from "@mui/material";
import { Table } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Add, TableRows, Update, Delete } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { URL } from "@/api";
import React from "react";
export function applyPagination(
  documents: any,
  page: number,
  rowsPerPage: number
) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
const Page = () => {
  const theme = useTheme();
  const router = useRouter();
  const { loading, data, error, refetch } = useQuery(gql`
    query {
      get_all_videos {
        id
        title
        photo
        disc
        link
        isZoomMeet
        isLiveNow
        is48h
        createAt
      }
    }
  `);

  const [deleteVideo, { loading: lo, data: da, error: err }] = useMutation(gql`
    mutation delete_video($id: ID) {
      delete_video(id: $id) {
        id
      }
    }
  `);
  const [videoName, setVideoName] = React.useState({
    name: "",
    id: "",
  });
  React.useEffect(() => {
    refetch();
  }, []);
  const [D, setD] = React.useState("");
  const [dd, setDd] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  React.useEffect(() => {
    return setData(
      applyPagination(data?.get_all_videos || [], page, rowsPerPage)
    );
  }, [page, rowsPerPage, data]);
  const handlePageChange = React.useCallback((event: any, value: any) => {
    setPage(value);
  }, []);
  const [_data, setData] = React.useState(
    applyPagination(data?.get_all_videos || [], page, rowsPerPage)
  );
  const handleRowsPerPageChange = React.useCallback((event: any) => {
    setRowsPerPage(event.target.value);
  }, []);
  return (
    !loading &&
    data && (
      <>
        <MainCard
          secondary={
            <IconButton
              title="Add Videos"
              onClick={() => router.push("/admin/video/add")}
            >
              <Add />
            </IconButton>
          }
          title="All Videos"
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
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Photo
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Discretion
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Link
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      isZoomMeet
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      isLiveNow
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      is48h
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      createAt
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
                {_data.map((v: any, i: any) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography
                        flexWrap={"wrap"}
                        sx={{ fontWeight: theme.typography.fontWeightBold }}
                      >
                        {v.id}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography flexWrap={"wrap"}>{v.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <img
                        src={v.photo}
                        height={200}
                        style={{ borderRadius: "20px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography flexWrap={"wrap"}>{v.disc}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography flexWrap={"wrap"}>{URL + v.link}</Typography>
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled checked={v.isZoomMeet} />
                    </TableCell>
                    <TableCell>
                      <Checkbox disabled checked={v.isLiveNow} />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        disabled
                        checked={
                          new Date(parseInt(v.is48h)).getDate() <=
                          new Date().getDate()
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {
                          new Date(parseInt(v.crateAt))
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => {
                          setD("Delete");
                          setVideoName({
                            name: v.title,
                            id: v.id,
                          });
                          setDd(true);
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
                          setVideoName({
                            name: v.title,
                            id: v.id,
                          });
                          setDd(true);
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
            count={data.get_all_videos.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </MainCard>
        <Dialog open={dd}>
          <DialogTitle>Do you want to {D} this Video?</DialogTitle>
          <DialogContent>
            <DialogContentText>NAME : {videoName.name}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              onClick={() => {
                if (D == "Delete") {
                  deleteVideo({
                    variables: {
                      id: videoName.id,
                    },
                  }).then((e) => {
                    refetch();
                    setDd(false);
                  });
                } else {
                  router.push("/admin/video/update/" + videoName.id);
                }
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setDd(!dd)}>No</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};

Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
