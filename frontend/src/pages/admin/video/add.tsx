import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useTheme } from "@emotion/react";
import FileUpload from "@/Components/FileUpload";
import AnimateButton from "@/Components/extr/AnimateButton";
import { Classes, URL, add_video_data } from "@/api";
import VideoUpload from "@/Components/VideoUpload";

const Page = () => {
  const theme: any = useTheme();
  const [video, setVideo] = React.useState<any>();
  const [data, setData] = React.useState({
    class: "",
    title: "",
    photo: "",
    disc: "",
    doc: "",
    link: "",
  });
  const [dis, setDis] = React.useState(false);
  const [classes, setClasses] = React.useState([]);
  useEffect(() => {
    Classes().then(({ data }) => {
      setClasses(data.data.map((v: any) => ({ name: v.name, id: v.id })));
    });
  }, []);
  return (
    <>
      <MainCard title="Add Video">
        <Box px={20} py={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add_video_data(data).then(({ data }) => {
                console.log(data);
              });
              setDis(true);
            }}
          >
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Class</InputLabel>
              <Select
                value={data.class}
                onChange={(e) =>
                  setData((s) => ({ ...s, class: e.target.value }))
                }
              >
                {classes &&
                  classes.map((v: any) => (
                    <MenuItem value={v.id}>{v.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={data.title}
                onChange={(e) =>
                  setData((s) => ({ ...s, title: e.target.value }))
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Description </InputLabel>
              <OutlinedInput
                multiline
                value={data.disc}
                onChange={(e) =>
                  setData((s) => ({ ...s, disc: e.target.value }))
                }
              />
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel>Document Link</InputLabel>
              <OutlinedInput
                type="text"
                value={data.doc}
                onChange={(e) => setData({ ...data, doc: e.target.value })}
              />
            </FormControl>
            <FileUpload
              imageLink={data.photo}
              onChange={(e) => {
                setData({ ...data, photo: e });
              }}
            />
            <br />
            <VideoUpload
              onChange={(e) => {
                setData((s) => ({ ...s, link: e }));
                console.log(e);
              }}
            />
            <Box sx={{ marginX: 5, width: 100, height: 10 }}></Box>

            <Box sx={{ marginX: 5, width: 100, height: 10 }}></Box>
            <AnimateButton>
              <Button
                fullWidth
                disabled={data.link == "" || dis}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </AnimateButton>
          </form>
        </Box>
      </MainCard>
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
