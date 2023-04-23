import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
import {
  Checkbox,
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
import { gql, useQuery } from "@apollo/client";
import { Add, TableRows } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

export default () => {
  const theme = useTheme();
  const router = useRouter();
  const { loading, data, error } = useQuery(gql`
    query {
      get_teacher {
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
  return (
    !loading &&
    data && (
      <Layout>
        <MainCard
          secondary={
            <IconButton
              title="add class"
              onClick={() => router.push("/admin/teacher/add")}
            >
              <Add />
            </IconButton>
          }
          title="All Teachers"
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
                </TableRow>
              </TableHead>
              <TableBody>
                {data.get_teacher.map((v: any) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Layout>
    )
  );
};
