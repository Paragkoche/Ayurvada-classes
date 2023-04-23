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
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useTheme } from "@emotion/react";
import FileUpload from "react-mui-fileuploader";
import AnimateButton from "@/Components/extr/AnimateButton";
import { URL } from "@/api";

export default () => {
  const theme: any = useTheme();
  const [video, setVideo] = React.useState<any>();
  const [data, setData] = React.useState({
    class: "",
    title: "",
    photo: "",
    disc: "",
    isZoomMeet: false,
    isLiveNow: false,
    link: null,
  });
  const [dis, setDis] = React.useState(false);
  const {
    data: _data,
    loading,
    error,
  } = useQuery(gql`
    query {
      get_all_classes {
        id
        name
      }
    }
  `);
  const [addVideo, { loading: loo, data: d, error: er }] = useMutation(gql`
    mutation make_video(
      $class: ID
      $title: String
      $photo: String
      $disc: String
      $isZoomMeet: Boolean
      $isLiveNow: Boolean
      $link: String
    ) {
      make_video(
        classID: $class
        title: $title
        photo: $photo
        disc: $disc
        isZoomMeet: $isZoomMeet
        isLiveNow: $isLiveNow
        link: $link
      ) {
        id
      }
    }
  `);
  return (
    <Layout>
      <MainCard title="Add Video or Zoom meet Link">
        <Box px={20} py={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDis(true);
              addVideo({
                variables: {
                  class: data.class,
                  title: data.title,
                  photo: data.photo,
                  disc: data.disc,
                  isZoomMeet: data.isZoomMeet,
                  isLiveNow: data.isLiveNow,
                  link: data.link,
                },
              })
                .then((e) => {
                  if (!e.data) return;
                  if (!data.isZoomMeet) {
                    const fromData = new FormData();
                    fromData.append("file", video, video.path);
                    fetch(URL + "/upload/video/" + e.data.make_video.id, {
                      credentials: "include",
                      method: "POST",
                      body: fromData,
                    }).then(
                      () => {
                        alert("video is posted");
                      },
                      () => {
                        alert("video not is posted, Try again");
                      }
                    );
                  }
                })
                .finally(() => {
                  setData({
                    class: "",
                    title: "",
                    photo: "",
                    disc: "",
                    isZoomMeet: false,
                    isLiveNow: false,
                    link: null,
                  });
                  setDis(false);
                });
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
                {_data &&
                  _data.get_all_classes.map((v: any) => (
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
            <FileUpload
              sx={{ ...theme.typography.customInput }}
              multiFile={false}
              acceptedType="image/*"
              title="Photo"
              getBase64
              onFilesChange={(e) => {
                if (e.length != 0) setData((s) => ({ ...s, photo: e[0].path }));
              }}
            />

            {!data.isZoomMeet ? (
              <FileUpload
                acceptedType="video/*"
                allowedExtensions={["mp4"]}
                sx={{ ...theme.typography.customInput }}
                multiFile={false}
                title="Video"
                onFilesChange={(e) => {
                  if (e.length != 0) setVideo(e[0]);
                }}
              />
            ) : (
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Invite Link</InputLabel>
                <OutlinedInput />
              </FormControl>
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                sx={{ ...theme.typography.customInput }}
                control={
                  <Checkbox
                    checked={data.isZoomMeet}
                    onChange={() =>
                      setData((s) => ({ ...s, isZoomMeet: !s.isZoomMeet }))
                    }
                    name="checked"
                    color="primary"
                  />
                }
                label="Is Zoom"
              />
              <FormControlLabel
                sx={{ ...theme.typography.customInput }}
                control={
                  <Checkbox
                    checked={data.isLiveNow}
                    onChange={() =>
                      setData((s) => ({ ...s, isLiveNow: !s.isLiveNow }))
                    }
                    name="checked"
                    color="primary"
                  />
                }
                label="Is Live Now"
              />
            </Stack>
            <AnimateButton>
              <Button
                fullWidth
                disabled={dis}
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
    </Layout>
  );
};
