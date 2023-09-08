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
  Select,
  MenuItem,
  FormLabel,
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
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { Classes, Users, add_user_in_class, delete_user } from "@/api";
import AnimateButton from "@/Components/extr/AnimateButton";
import { MultiSelect } from "react-mui-multi-select";
import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";
export function applyPagination(
  documents: any,
  page: number,
  rowsPerPage: number
) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
const Page = () => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const theme = useTheme();
  const router = useRouter();
  const [dialog, setDialog] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [seleteName, setSelectedName] = React.useState<any>({ name: "" });
  const [D, setD] = React.useState("");
  const [data, _setData] = React.useState<any[]>([]);
  const [classes, setClasses] = React.useState([]);

  React.useEffect(() => {
    Users()
      .then((data) => {
        Classes().then(({ data }) => {
          setClasses(data.data);
        });
        _setData(data.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [_data, setData] = React.useState(data);
  React.useEffect(() => {
    return setData(data || []);
  }, [data]);

  // const handlePageChange = React.useCallback((event: any, value: any) => {
  //   setPage(value);
  // }, []);

  // const handleRowsPerPageChange = React.useCallback((event: any) => {
  //   setRowsPerPage(event.target.value);
  // }, []);
  const [selectClass, setSelectClass] = useState("All");
  const [name, setName] = useState("");
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    setData(
                      e.target.value == ""
                        ? data
                        : _data
                            .map((v: any) => {
                              if (
                                (v.name as string)
                                  .toLocaleLowerCase()

                                  .includes(name.toLocaleLowerCase())
                              ) {
                                return v;
                              }
                            })
                            .filter((v: any) => v != undefined) || []
                    );
                  }}
                  placeholder="Name of Student"
                  fullWidth={false}
                ></OutlinedInput>
              </FormControl>
            </Stack>

            <Stack sx={{ width: 400 }}>
              <FormControl fullWidth>
                <FormLabel>Class</FormLabel>
                <Select
                  label="Class"
                  value={selectClass}
                  onChange={(e) => {
                    let studentsForClass = [];
                    setSelectClass(e.target.value);

                    if (e.target.value == "All") setData(data || []);
                    else {
                      for (const student of data) {
                        const classInfo = student.payFor.find(
                          (payment: any) => payment.class.name == e.target.value
                        );

                        if (classInfo !== undefined)
                          studentsForClass.push(student);
                      }
                      setData(studentsForClass || []);
                    }
                  }}
                >
                  {[{ name: "All" }, ...classes]?.map((v: any, i) => (
                    <MenuItem key={v?.id || i} value={v.name}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                      Classes
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
                  <>
                    <T
                      myKey={v.id}
                      {...{ classes, v, setD, setSelectedName, setDialog }}
                    />
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            component="div"
            count={data.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          /> */}
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
                if (D == "Delete") {
                  delete_user(seleteName.id);
                } else if (D == "Access Classes") {
                  router.push("/admin/users/add-class/" + seleteName.id);
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
const T = ({ myKey, classes, v, setD, setSelectedName, setDialog }: any) => {
  const [PayFor, setPayFor] = useState<any>(v.payFor.map((v: any) => v.class));
  const [allClasses, setAllClasses] = useState(classes);
  const router = useRouter();
  React.useEffect(() => {
    let ids = PayFor.map((v: any) => v.id);
    setAllClasses((s: any) => s.filter((v: any) => !ids.includes(v.id)));
  }, []);

  return (
    <TableRow key={myKey}>
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
        {/* <MultiSelect
          getOptionLabel={(v: any) => {
            return v.name;
          }}
          getOptionKey={(v: any) => {
            return v.id;
          }}
          key={Math.random()}
          options={allClasses}
          value={PayFor}
          onChange={function (value: any[]): void {
            add_user_in_class({ classId: value.at(-1).id, userId: v.id }).then(
              ({ data }) => {
                setPayFor(value);
              }
            );
          }}
        /> */}
        <Button
          onClick={() => {
            setD("Access Classes");
            setSelectedName({
              id: v.id,
              name: v.name,
            });
            setDialog((s: any) => !s);
          }}
        >
          Access Class
        </Button>
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
            setDialog((s: any) => !s);
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
            setDialog((s: any) => !s);
          }}
        >
          <Update />
        </Button>
      </TableCell>
    </TableRow>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
