import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  DialogContent,
  TablePagination,
  TableRow,
  Typography,
  Snackbar,
  useTheme,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { styled } from "@mui/material/styles";
import React from "react";
import { useRouter } from "next/router";
const Scrollbar = styled(SimpleBar)``;
const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const CustomersTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    refresh,
    ActionButton = <></>,
    headers = [],
    theme = useTheme(),
  } = props;
  const [open, setOpen] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);
  const [message, setMessage] = React.useState<string>("");
  const [Dprops, setDProps] = React.useState<{
    data?: {
      title: string;
      message: string;
    };
    action_button?: Array<{ fun: () => any; name: string }>;
  }>({});
  const router = useRouter();
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((v: any, i: any) => (
                  <TableCell key={i}>
                    <Typography
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                      {v}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer: any) => {
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={customer.avatar}
                          sx={{ bgcolor: "warning.main" }}
                        >
                          {getInitials(customer.company_repName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.company_repName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.company_name}</TableCell>
                    <TableCell>{customer.mobile_no}</TableCell>
                    <TableCell>
                      <ActionButton />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <PopUp open={open} {...Dprops} />
      <Snackbar
        open={openS}
        message={message}
        onClose={() => setOpenS((s) => !s)}
      />
    </Card>
  );
};
const PopUp = (props: {
  data?: {
    title: string;
    message: string;
  };
  action_button?: Array<{ fun: () => any; name: string }>;
  open: boolean;
}) => {
  return (
    <Dialog open={props.open}>
      <DialogTitle>{props.data?.title}</DialogTitle>
      <DialogContent>{props.data?.message}</DialogContent>
      <DialogActions>
        {props?.action_button?.map((v, i) => (
          <Button onClick={v.fun} key={i}>
            {v.name}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  refresh: PropTypes.func,
};
