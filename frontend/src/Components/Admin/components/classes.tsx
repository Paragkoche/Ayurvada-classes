import MainCard from "@/Components/MainCard";
import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Card, CardContent, Grid } from "@mui/material";
import { useRouter } from "next/router";
const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  cursor: "pointer",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));
export default () => {
  const router = useRouter();
  const theme: any = useTheme();
  const { loading, data, error } = useQuery(gql`
    query {
      get_all_classes {
        id
      }
    }
  `);
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
    data && (
      <CardWrapper
        border={false}
        content={false}
        onClick={() => {
          router.push("/admin/classes");
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
                      backgroundColor: theme.palette.primary[800],
                      mt: 1,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-home-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <rect x="10" y="12" width="4" height="4" />
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
                    {data.get_all_classes.length}
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
                  color: theme.palette.primary[200],
                }}
              >
                Total Classes
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    )
  );
};
