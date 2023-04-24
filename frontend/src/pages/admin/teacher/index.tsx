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
        <MainCard title="All Teachers" content={true}>
          <Typography>Coming Soon</Typography>
        </MainCard>
      </Layout>
    )
  );
};
