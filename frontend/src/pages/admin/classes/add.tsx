import MainCard from "@/Components/MainCard";
import Layout from "../Layout";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  styled,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { Grid } from "@mui/material";
import Yup from "yup";
import FileUpload from "react-mui-fileuploader";
import React from "react";
import AnimateButton from "@/Components/extr/AnimateButton";
import { gql, useMutation } from "@apollo/client";
const AuthWrapper1 = styled("div")(({ theme }) => ({}));
const FL = styled(FileUpload)(({ theme }) => ({
  color: theme.palette.background.paper,
}));

const Page = () => {
  const [data, setData] = React.useState({
    photo: "",
    pay: "",
    endOn: "",
    name: "",
  });
  const [add_class, { loading, error, data: _data }] = useMutation(gql`
    mutation make_classes(
      $photo: String
      $name: String
      $pay: String
      $endOn: String
    ) {
      make_classes(photo: $photo, name: $name, pay: $pay, endOn: $endOn) {
        id
      }
    }
  `);
  const [isSubmitting, setisSubmitting] = React.useState(false);
  const theme: any = useTheme();
  return (
    <>
      <MainCard>
        <Box px={20} py={3}>
          <Formik
            initialValues={{
              photo: "",
              pay: "",
              endOn: "",
              name: "",
            }}
            onSubmit={(e) => {
              console.log(e);
            }}
          >
            <form
              noValidate
              onSubmit={(event) => {
                setisSubmitting(true);
                event.preventDefault();
                if (!data.name || !data.endOn || !data.pay || !data.photo) {
                  setisSubmitting(false);
                  return alert("Data not fill properly");
                }
                console.log(data);
                add_class({ variables: data })
                  .then(
                    () => {
                      setData({
                        photo: "",
                        pay: "",
                        endOn: "",
                        name: "",
                      });
                      alert("class make successfully");
                    },
                    (err) => {
                      alert(err.message);
                    }
                  )
                  .finally(() => {
                    setisSubmitting(false);
                  });
              }}
            >
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Title</InputLabel>
                <OutlinedInput
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                  value={data.pay}
                  onChange={(e) => setData({ ...data, pay: e.target.value })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>End on</InputLabel>
                <OutlinedInput
                  type="date"
                  value={data.endOn}
                  onChange={(e) => setData({ ...data, endOn: e.target.value })}
                />
              </FormControl>

              <FL
                color={theme.palette.grey[100] + "!important"}
                title="Photo"
                header="[Drag to drop]"
                sx={{
                  color: theme.palette.grey[100],
                }}
                getBase64={true}
                multiFile={false}
                maxUploadFiles={1}
                acceptedType={"image/*"}
                onFilesChange={(e) => {
                  if (e.length !== 0)
                    setData((s) => ({ ...s, photo: e[0].path }));
                }}
              />
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Submit
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          </Formik>
        </Box>
      </MainCard>
    </>
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
