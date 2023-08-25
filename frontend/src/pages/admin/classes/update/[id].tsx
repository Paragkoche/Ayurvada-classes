import MainCard from "@/Components/MainCard";
import Layout from "../../Layout";
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
import { useRouter } from "next/router";
import FileUpload from "@/Components/FileUpload";
import { one_class, update_class } from "@/api";

const Page = () => {
  const router = useRouter();
  const { id }: any = router.query;

  React.useEffect(() => {
    try {
      if (id)
        one_class(id).then(({ data }) => {
          console.log(data);

          setData(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  const [data, setData] = React.useState<any>();
  console.log(data);
  const [isSubmitting, setisSubmitting] = React.useState(false);
  const theme: any = useTheme();
  return (
    data && (
      <>
        <MainCard>
          <Box px={20} py={3}>
            <Formik
              initialValues={{
                photo: "",
                pay: "",
                end_on: "",
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
                  if (!data.name || !data.end_on || !data.pay || !data.photo) {
                    setisSubmitting(false);
                    return alert("Data not fill properly");
                  }
                  update_class({ classId: data.id, ...data }).then(
                    (data) => {
                      setisSubmitting(false);
                      router.push("/admin/classes");
                    },
                    (err) => {
                      alert(err.response.massage);
                    }
                  );
                  console.log(data);
                }}
              >
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel>Title</InputLabel>
                  <OutlinedInput
                    value={data.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        name: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    value={data.pay}
                    onChange={(e) =>
                      setData({
                        ...data,
                        pay: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel>End on</InputLabel>
                  <OutlinedInput
                    type="date"
                    value={data.end_on}
                    onChange={(e) =>
                      setData({
                        ...data,
                        end_on: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FileUpload
                  imageLink={data.photo}
                  onChange={(e: any) =>
                    setData({
                      ...data,
                      photo: e,
                    })
                  }
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
    )
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
