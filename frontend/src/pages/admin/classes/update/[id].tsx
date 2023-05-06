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
import { Grid } from "@mui/material";
import Yup from "yup";
import FileUpload from "react-mui-fileuploader";
import React from "react";
import AnimateButton from "@/Components/extr/AnimateButton";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
const FL = styled(FileUpload)(({ theme }) => ({
  color: theme.palette.background.paper,
}));

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    loading: lo,
    data: dd,
    error: er,
  } = useQuery(gql`
    query {
      get_classes_id(id: "${id}") {
        photo
        name
        pay
        endOn
      }
    }
  `);
  React.useEffect(() => {
    setData(dd);
  }, [dd]);
  const [data, setData] = React.useState<any>();
  const [add_class, { loading, error, data: _data }] = useMutation(gql`
    mutation update_classes(
      $photo: String
      $name: String
      $pay: String
      $endOn: String
      $id: ID
    ) {
      update_classes(
        id: $id
        photo: $photo
        name: $name
        pay: $pay
        endOn: $endOn
      ) {
        id
      }
    }
  `);
  const [isSubmitting, setisSubmitting] = React.useState(false);
  const theme: any = useTheme();
  return (
    !lo &&
    dd &&
    data && (
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
                  if (
                    !data.get_classes_id.name ||
                    !data.get_classes_id.endOn ||
                    !data.get_classes_id.pay ||
                    !data.get_classes_id.photo
                  ) {
                    setisSubmitting(false);
                    return alert("Data not fill properly");
                  }
                  console.log(data);
                  add_class({ variables: { id, ...data.get_classes_id } })
                    .then(
                      () => {
                        // setData({
                        //   id: "",
                        //   photo: "",
                        //   pay: "",
                        //   endOn: "",
                        //   name: "",
                        // });
                        alert("class update successfully");
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
                    value={data.get_classes_id.name}
                    onChange={(e) =>
                      setData({
                        get_classes_id: {
                          ...data.get_classes_id,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    value={data.get_classes_id.pay}
                    onChange={(e) =>
                      setData({
                        get_classes_id: {
                          ...data.get_classes_id,
                          pay: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel>End on</InputLabel>
                  <OutlinedInput
                    type="date"
                    value={data.get_classes_id.endOn}
                    onChange={(e) =>
                      setData({
                        get_classes_id: {
                          ...data.get_classes_id,
                          endOn: e.target.value,
                        },
                      })
                    }
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
                      setData((s: any) => ({
                        get_classes_id: {
                          ...s.get_classes_id,
                          photo: e[0].path,
                        },
                      }));
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
    )
  );
};
Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
