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
import { useRouter } from "next/router";
import { Card, CardContent, Grid } from "@mui/material";
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
      get_teacher {
        id
      }
    }
  `);
  return loading ? (
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
    <CardWrapper
      border={false}
      content={false}
      onClick={() => {
        router.push("/admin/teacher");
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
                    className="icon icon-tabler icon-tabler-school"
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
                    <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                    <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
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
                  {data.get_teacher.length}
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
              Total Teachers
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardWrapper>
  );
};
