import { Button, Container, Input, OutlinedInput, Stack } from "@mui/material";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default ({
  imageLink,
  onChange: changeFu,
}: {
  imageLink: any;
  onChange: (e: any) => void;
}) => {
  const [src, setSrc] = useState(imageLink);
  const ref = useRef<any>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;
    console.log(files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = function () {
      changeFu(reader.result);
      setSrc(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return (
    <Stack direction="row" alignItems="center" spacing={20}>
      <Image height={240} width={240} src={src} alt="-" />
      <input
        ref={ref}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onChange}
      />

      <Button
        onClick={() => ref.current && ref.current.click()}
        variant="contained"
      >
        Change Image
      </Button>
    </Stack>
  );
};
