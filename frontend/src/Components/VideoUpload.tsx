import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Input,
  OutlinedInput,
  Stack,
} from "@mui/material";
import Plyr, { APITypes } from "plyr-react";
import Image from "next/image";
import "plyr-react/plyr.css";
import { ChangeEvent, useRef, useState } from "react";
import { add_video_file } from "@/api";
import { isNonNullChain } from "typescript";

export default ({
  onChange: setLink,
  Link,
}: {
  onChange: (e: any) => void;
  Link?: string;
}) => {
  const [src, setSrc] = useState<any>();
  const [video_url, setVideo_url] = useState(Link);
  const ref = useRef<any>(null);
  const [uploading, setupLoading] = useState<number | null | undefined>(0);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;
    console.log(files[0]);
    setVideo_url(URL.createObjectURL(files[0]));
    if (files) setSrc(files[0]);
  };
  const Uploading = () => {
    console.log(src);
    const fromData = new FormData();

    if (src) {
      fromData.append("video", src);
      add_video_file(fromData, (e) => {
        console.log(e.progress?.toFixed(3));
        setupLoading(e.progress);
      }).then(({ data }) => {
        console.log(data);
        setLink(data as string);
        console.log(data as string);
        setIsUploaded(true);
      });
    }
  };
  console.log((uploading || 0) * 100 <= 1 ? "indeterminate" : "determinate");

  return (
    <Grid container spacing={30}>
      <Grid item xs={10}>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Plyr
              width={240}
              height={240}
              source={{
                type: "video",

                sources: [
                  {
                    src: video_url || Link || "",
                    provider: "html5",
                    size: 240,
                  },
                ],
              }}
            />
          </Grid>

          <input
            ref={ref}
            type="file"
            accept="video/mp4,video/x-m4v"
            style={{ display: "none" }}
            onChange={onChange}
          />
          {!uploading || uploading == 1 ? (
            !isUploaded ? (
              <>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Button
                    onClick={() => ref.current && ref.current.click()}
                    variant="contained"
                  >
                    Select Video
                  </Button>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Button onClick={Uploading} variant="contained">
                    Upload Video
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Button color="error">Delete</Button>
              </Grid>
            )
          ) : (
            <CircularProgress
              variant={uploading * 100 <= 1 ? "indeterminate" : "determinate"}
              value={uploading * 100}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};