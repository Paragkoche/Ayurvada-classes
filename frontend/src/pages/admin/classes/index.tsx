import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
import {
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
