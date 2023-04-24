import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
import {
  Button,
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
} from "@mui/material";
import { Table } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Add, Delete, TableRows, Update } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default () => {
  const theme = useTheme();
  const router = useRouter();
  const { loading, data, error, refetch } = useQuery(gql`
    query {
      get_all_classes {
        id
        photo
        name
        pay
        endOn
        crateAt
      }
    }
  `);
  const [delete_classes, { loading: lo, data: da, error: er }] =
    useMutation(gql`
      mutation delete_classes($id: ID) {
        delete_classes(id: $id) {
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
  return (
    !loading &&
    data && (
      <Layout>
        <MainCard
          secondary={
            <IconButton
              title="add class"
              onClick={() => router.push("/admin/classes/add")}
            >
              <Add />
            </IconButton>
          }
          title="All classes"
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
                      Photo
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
                      Pay
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      End On
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      Crate At
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
                {data.get_all_classes.map((v: any) => (
                  <TableRow>
                    <TableCell>
                      <Typography
                        sx={{ fontWeight: theme.typography.fontWeightBold }}
                      >
                        {v.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <img
                        src={v.photo}
                        height={200}
                        style={{ borderRadius: "20px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>{v.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{v.pay}₹</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{v.endOn}</Typography>
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
                            name: v.name,
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
                            name: v.name,
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
        </MainCard>
        <Dialog open={dd}>
          <DialogTitle>Do you want to {D} this Classes?</DialogTitle>
          <DialogContent>
            <DialogContentText>NAME : {videoName.name}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              onClick={() => {
                if (D == "Delete") {
                  delete_classes({
                    variables: {
                      id: videoName.id,
                    },
                  }).then((e) => {
                    refetch();
                    setDd(false);
                  });
                } else {
                  router.push("/admin/classes/update/" + videoName.id);
                }
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setDd(!dd)}>No</Button>
          </DialogActions>
        </Dialog>
      </Layout>
    )
  );
};
