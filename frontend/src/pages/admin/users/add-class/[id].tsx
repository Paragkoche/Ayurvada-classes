import { useRouter } from "next/router";
import Layout from "../../Layout";
import React from "react";
import {
  Classes,
  add_user_in_class,
  delete_user_in_class,
  one_user,
} from "@/api";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Input,
  Checkbox,
} from "@mui/material";
import MainCard from "@/Components/MainCard";

const Page = () => {
  const theme = useTheme();
  const [userData, setUserData] = React.useState<any>();
  const [classes, setClasses] = React.useState<any[]>([]);
  const router = useRouter();
  const [Loading, setLoading] = React.useState(true);
  const { id }: { id?: string } = router.query;
  React.useEffect(() => {
    if (id)
      one_user(id)
        .then((data) => {
          setUserData(data.data.data);
          Classes().then(({ data }) => {
            setClasses(data.data);
          });
        })
        .finally(() => {
          setLoading(false);
        });
  }, [id]);
  console.log(userData);

  return Loading ? (
    <CircularProgress />
  ) : (
    <MainCard>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Photo
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Pay
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Access Class (Add/Remove)
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((v: any) => (
              <TableRow>
                <TableCell>
                  <img
                    src={v.photo}
                    height={200}
                    style={{ borderRadius: "20px" }}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{v.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{v.pay}₹</Typography>
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={userData.payFor
                      .map((c: any) => c.class.id)
                      .includes(v.id)}
                    onChange={(e) => {
                      console.log(e.target.value);

                      if (e.target.checked) {
                        add_user_in_class({
                          classId: v.id,
                          userId: userData.id,
                        }).then(() => {
                          alert("User Access to " + v.name);
                          router.reload();
                        });
                      } else {
                        const data = userData.payFor
                          .filter((c: any) => c.class.id == v.id)
                          .map((v: any) => v.id);
                        for (let d of data) {
                          console.log(d);

                          delete_user_in_class({ id: d });
                        }
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

Page.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Page;
