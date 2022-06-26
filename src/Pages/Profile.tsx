import { ExitToApp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authActions } from "../store/AuthSlice";
import { IRegisterData } from "./Register";

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const user = JSON.parse(
    localStorage.getItem("user") as string
  ) as IRegisterData;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("user");
      dispatch(authActions.logout());
      enqueueSnackbar("Successfully logged out!", {
        variant: "success",
      });
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <Grid
        container
        sx={{
          height: "100vh",
          backgroundImage: "url(https://source.unsplash.com/user/aaronburden)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          filter: "brightness(0.8)",
        }}
      >
        <Grid
          container
          sx={{
            my: "50px",
            mx: "150px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={0}
            square
            sx={{ borderRadius: "10px" }}
          >
            <Box
              sx={{
                my: 15,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h2">
                Profile
              </Typography>
              <Typography variant="body2" sx={{ color: "#bcbaba" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </Typography>
              <Box
                sx={{
                  mt: 5,
                  mx: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Full Name: </Typography>
                    <Typography variant="h6">
                      {user?.firstName} {user?.lastName}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Email: </Typography>
                    <Typography variant="h6">{user?.email}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Password: </Typography>
                    <Typography variant="h6">{user?.password}</Typography>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    bgcolor: "#1F28EB",
                    "&:hover": {
                      backgroundColor: "#232bc8",
                    },
                  }}
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Logout"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
