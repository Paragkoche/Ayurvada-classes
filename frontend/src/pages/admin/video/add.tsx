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

const Page = () => {
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
  function consume(stream: any, total = 0) {
    while (stream.state === "readable") {
      var data = stream.read();
      total += data.byteLength;
      console.log(
        "received " + data.byteLength + " bytes (" + total + " bytes in total)."
      );
    }
    if (stream.state === "waiting") {
      stream.ready.then(() => consume(stream, total));
    }
    return stream.closed;
  }
  return (
    <>
      <MainCard title="Add Video or Zoom meet Link">
        <Box px={20} py={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDis(true);

              const fromData = new FormData();
              fromData.append("file", video, video.path);
              fromData.append("class", data.class);
              fromData.append("title", data.title);
              fromData.append("photo", data.photo);
              fromData.append("disc", data.disc);
              // fromData.append("disc",data.disc);

              fetch(URL + "/upload/video/", {
                credentials: "include",
                method: "POST",
                body: fromData,
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
                .then(
                  (e) => {
                    consume(e.body);
                    alert("video is posted");
                  },
                  () => {
                    alert("video not is posted, Try again");
                  }
                )
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
              sx={{ ...theme.typography.customInput, marginX: 5 }}
              multiFile={false}
              acceptedType="image/*"
              title="Photo"
              getBase64
              onFilesChange={(e) => {
                if (e.length != 0) setData((s) => ({ ...s, photo: e[0].path }));
              }}
            />
            <Box sx={{ marginX: 5, width: 100, height: 10 }}></Box>
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
            <Box sx={{ marginX: 5, width: 100, height: 10 }}></Box>
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
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
