import MainCard from "@/Components/MainCard";
import Layout from "../../Layout";
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
import { Classes, URL, add_video_data, one_video, update_video } from "@/api";
import VideoUpload from "@/Components/VideoUpload";
import { useRouter } from "next/router";

const Page = () => {
  const theme: any = useTheme();
  const [video, setVideo] = React.useState<any>();
  const [data, setData] = React.useState<any>();
  const [dis, setDis] = React.useState(false);
  const router = useRouter();
  const { id }: any = router.query;

  React.useEffect(() => {
    try {
      if (id)
        one_video(id).then(({ data }) => {
          console.log(data);

          setData(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  console.log(data);

  return (
    data && (
      <>
        <MainCard title="Add Video">
          <Box px={20} py={3}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update_video(data, data.id).then(({ data }) => {
                  router.push("/admin/video");
                });
                // setDis(true);
              }}
            >
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  value={data.title}
                  onChange={(e) =>
                    setData((s: any) => ({ ...s, title: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Description </InputLabel>
                <OutlinedInput
                  multiline
                  value={data.disc}
                  onChange={(e) =>
                    setData((s: any) => ({ ...s, disc: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Document Link </InputLabel>
                <OutlinedInput
                  multiline
                  value={data.doc}
                  onChange={(e) =>
                    setData((s: any) => ({ ...s, doc: e.target.value }))
                  }
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
                  setData((s: any) => ({ ...s, link: e }));
                  console.log(e);
                }}
              />
              <Box sx={{ marginX: 5, width: 100, height: 10 }}></Box>

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
    )
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
