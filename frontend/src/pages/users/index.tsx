import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Card,
  CardHeader,
  CircularProgress,
  CssBaseline,
  Drawer,
  MenuList,
  Toolbar,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

const drawerWidth = 260;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: any) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

import React from "react";
import { gql, useQuery } from "@apollo/client";
const Header = ({ handleLeftDrawerToggle, data }: any) => {
  const theme: any = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        {/* <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={() => handleLeftDrawerToggle(!data)}
            color="inherit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </Avatar>
        </ButtonBase> */}
        <Box
          component="span"
          sx={{
            display: { xs: "none", md: "block" },
            flexGrow: 1,
            marginLeft: "20px",
          }}
        >
          <h1>Ayurveda</h1>
        </Box>
      </Box>

      {/* header search */}

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
};

const Sidebar = ({ drawerOpen, drawerToggle, window }: any) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <h1>Ayurveda</h1>
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <li>OK</li>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <li>OK</li>
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
export default () => {
  const { loading, data, error } = useQuery(gql`
    query {
      getClasses {
        name
        videos {
          id
        }
      }
    }
  `);
  const [handleLeftDrawerToggle, sethandleLeftDrawerToggle] =
    React.useState(true);
  const theme: any = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  console.log(data);

  return loading && !data ? (
    <CircularProgress />
  ) : (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar>
        <Toolbar>
          <Header
            handleLeftDrawerToggle={sethandleLeftDrawerToggle}
            data={handleLeftDrawerToggle}
          />
        </Toolbar>
      </AppBar>
      {/* <Sidebar
        drawerOpen={
          !matchDownMd ? handleLeftDrawerToggle : !handleLeftDrawerToggle
        }
        drawerToggle={sethandleLeftDrawerToggle}
      /> */}
      {data.getClasses.map((v: any) => (
        <Card>
          <CardHeader>
            <img src={v.photo} />
          </CardHeader>
        </Card>
      ))}
    </Box>
  );
};
