import Layout from "../Layout";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
export default () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          marginTop: "8px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" align="center">
              Upload Video
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: "16px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Video Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Title" name="title" required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Video Upload
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Choose File
                      <input type="file" hidden />
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: "16px",
                      }}
                      type="submit"
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
