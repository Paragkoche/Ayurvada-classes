import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  CssBaseline,
  Drawer,
  Toolbar,
  styled,
  useMediaQuery,
  useTheme,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useRouter } from "next/router";
import { URL } from "@/api";
import { AppProps } from "next/app";
import SVG from "../../images/Mediamodifier-Design.svg";
import Image from "next/image";
const drawerWidth = 280;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
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
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
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
        </ButtonBase>
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
            flexGrow: 1,
            alignItems: "center",

            marginLeft: "20px",
          }}
        >
          <Image
            style={{ width: "100%", height: "50px" }}
            src={SVG}
            alt="logo"
          />
        </Box>
      </Box>

      {/* header search */}

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
};

export default ({ children }: any) => {
  const router = useRouter();
  // React.useEffect(() => {
  //   let token = Object.fromEntries(
  //     new URLSearchParams(document.cookie.replace(/; /g, "&"))
  //   );
  //   if (!token.token) router.push("/login");
  //   return () => {};
  // }, []);

  const [handleLeftDrawerToggle, sethandleLeftDrawerToggle] =
    React.useState(false);
  const theme: any = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: handleLeftDrawerToggle
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar>
          <Header
            handleLeftDrawerToggle={sethandleLeftDrawerToggle}
            data={handleLeftDrawerToggle}
          />
        </Toolbar>
      </AppBar>
      <Box
        component={"nav"}
        sx={{
          flexShrink: { md: 0 },
          width: matchUpMd ? drawerWidth : "auto",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={matchUpMd ? "persistent" : "temporary"}
          anchor="left"
          open={handleLeftDrawerToggle}
          onClose={() => sethandleLeftDrawerToggle((s) => !s)}
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
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
              <Image
                style={{ width: "100%", height: "50px" }}
                src={SVG}
                alt="logo"
              />
            </Box>
          </Box>
          <BrowserView>
            <PerfectScrollbar
              component="div"
              style={{
                height: !matchUpMd
                  ? "calc(100vh - 56px)"
                  : "calc(100vh - 88px)",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <List>
                {[
                  {
                    title: "Dashboard",
                    route: "/admin",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-dashboard"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M13.45 11.55l2.05 -2.05" />
                        <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Users",
                    route: "/admin/users",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-users"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                      </svg>
                    ),
                  },
                  {
                    title: "Video",
                    route: "/admin/video",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-player-play"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 4v16l13 -8z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Classes",
                    route: "/admin/classes",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-school"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                      </svg>
                    ),
                  },
                  {
                    title: "Teacher",
                    route: "/admin/teacher",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-school"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    ),
                  },
                  {
                    title: "Logout",
                    route: "/login",
                    icon: () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-logout"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                      </svg>
                    ),
                  },
                ].map((v, i) => (
                  <ListItemButton
                    selected={
                      router.pathname.indexOf(
                        v.route.split("/").at(-1) as any
                      ) !== -1 && v.route.split("/").length !== 2
                    }
                    onClick={async () => {
                      if (v.route == "/login") {
                        localStorage.clear();
                      }
                      router.push(v.route);
                    }}
                    sx={{
                      borderRadius: `${12}px`,
                      mb: 0.5,
                      alignItems: "flex-start",

                      backgroundColor:
                        1 > 1 ? "transparent !important" : "inherit",
                      py: 1.25,
                      pl: `${1 * 24}px`,
                    }}
                  >
                    <ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
                      <v.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant={"body1"} color="inherit">
                          {v.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </PerfectScrollbar>
          </BrowserView>
          {/* tu video ka dek  */}
          <MobileView>
            <Box sx={{ px: 2 }}>
              <PerfectScrollbar
                component="div"
                style={{
                  height: !matchUpMd
                    ? "calc(100vh - 56px)"
                    : "calc(100vh - 88px)",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <List>
                  {[
                    {
                      title: "Dashboard",
                      route: "/admin",
                      icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M13.45 11.55l2.05 -2.05" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Users",
                      route: "/admin/users",
                      icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M13.45 11.55l2.05 -2.05" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Video",
                      route: "/admin/video",
                      icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M13.45 11.55l2.05 -2.05" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Classes",
                      route: "/admin/classes",
                      icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M13.45 11.55l2.05 -2.05" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Teacher",
                      route: "/admin/teacher",
                      icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M13.45 11.55l2.05 -2.05" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Logout",
                      route: "/login",
                      icon: () => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M13.45 11.55l2.05 -2.05" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      ),
                    },
                  ].map((v, i) => (
                    <ListItemButton
                      selected={
                        router.pathname.indexOf(
                          v.route.split("/").at(-1) as any
                        ) !== -1 && v.route.split("/").length !== 2
                      }
                      onClick={async () => {
                        if (v.route == "/login") {
                          localStorage.clear();
                        }
                        router.push(v.route);
                      }}
                      sx={{
                        borderRadius: `${20}px`,
                        mb: 0.5,
                        alignItems: "flex-start",
                        gap: "20px",
                        backgroundColor:
                          1 > 1 ? "transparent !important" : "inherit",
                        py: 1 > 1 ? 1 : 1.25,
                        pl: `${1 * 24}px`,
                      }}
                    >
                      <ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
                        <v.icon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ marginLeft: "20px" }}
                        primary={
                          <Typography variant={"body1"} color="inherit">
                            {v.title}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </PerfectScrollbar>
            </Box>
          </MobileView>
        </Drawer>
      </Box>
      <Main theme={theme} open={handleLeftDrawerToggle}>
        {children}
      </Main>
    </Box>
  );
};
