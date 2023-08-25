//ider kay kar ra hai
import MainCard from "@/Components/MainCard";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { AccountBoxSharp } from "@mui/icons-material";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  cursor: "pointer",
  backgroundColor: theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));
export default ({
  loading,
  data,
  error,
}: {
  loading: boolean;
  data?: number;
  error: { message?: string | undefined };
}) => {
  const router = useRouter();
  const theme: any = useTheme();

  console.log(data);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return loading && !data ? (
    error ? (
      <Card>
        <CardContent>
          <Typography>{error.message}</Typography>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Skeleton variant="rectangular" width={44} height={44} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rectangular" width={34} height={34} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" height={30} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  ) : (
    (data && (
      <CardWrapper
        border={false}
        content={false}
        onClick={() => {
          router.push("/admin/users");
        }}
      >
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      cursor: "auto",
                      backgroundColor: theme.palette.secondary[800],
                      mt: 1,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#FFF"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="7" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "2.125rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    {data}
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: theme.palette.secondary[200],
                }}
              >
                Total Students
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    )) || <></>
  );
};
