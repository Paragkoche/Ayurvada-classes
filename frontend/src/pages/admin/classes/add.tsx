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
import React from "react";
import AnimateButton from "@/Components/extr/AnimateButton";
import { gql, useMutation } from "@apollo/client";
import FileUpload from "@/Components/FileUpload";
import { add_class } from "@/api";
import { useRouter } from "next/router";
const AuthWrapper1 = styled("div")(({ theme }) => ({}));

const Page = () => {
  const [data, setData] = React.useState({
    photo: "",
    pay: "",
    end_on: "",
    name: "",
    doc_link: "",
  });
  const router = useRouter();

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
              end_on: "",
              name: "",
              doc_link: "",
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
                if (!data.name || !data.end_on || !data.pay || !data.photo) {
                  setisSubmitting(false);
                  return alert("Data not fill properly");
                }
                console.log(data);
                add_class({ ...data })
                  .then(
                    (data) => {
                      console.log(data.data);

                      setData({
                        photo: "",
                        pay: "",
                        end_on: "",
                        name: "",
                        doc_link: "",
                      });
                      alert("class make successfully");
                      router.push("/admin/classes");
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
                  type="text"
                  value={data.end_on}
                  onChange={(e) => setData({ ...data, end_on: e.target.value })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel>Document Link</InputLabel>
                <OutlinedInput
                  type="text"
                  value={data.doc_link}
                  onChange={(e) =>
                    setData({ ...data, doc_link: e.target.value })
                  }
                />
              </FormControl>
              <FileUpload
                imageLink={data.photo}
                onChange={(e) => {
                  setData({
                    ...data,
                    photo: e,
                  });
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
