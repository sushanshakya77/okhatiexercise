import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/AuthSlice";
import { IRegisterData } from "./Register";

interface ILoginData {
  email: string;
  password: string;
}

// RFC5322 standard email validation
const emailValidationRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    setLoading(true);
    if (localStorage.getItem("user") === null) {
      setTimeout(() => {
        setLoading(false);
        setError("User not found");
      }, 1000);
    }
    if (
      data.email ===
        (JSON.parse(localStorage.getItem("user") as string) as IRegisterData)
          .email &&
      data.password ===
        (JSON.parse(localStorage.getItem("user") as string) as IRegisterData)
          .password
    ) {
      setTimeout(() => {
        dispatch(authActions.login());
        enqueueSnackbar("Successfully logged in! Welcome to Okhati Profile", {
          variant: "success",
        });
        setLoading(false);
        navigate("/profile");
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError("Invalid email or password");
      }, 1000);
    }
  };

  const reusableProps = React.useMemo<Record<string, unknown>>(
    () => ({
      size: "medium",
      variant: "outlined",
      required: true,
      fullWidth: true,
    }),
    []
  );

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        background:
          "linear-gradient(155deg, rgba(0,155,255,0.7514356084230567) 0%, rgba(15,186,118,1) 46%, rgba(167,114,153,1) 98%)",
      }}
    >
      <Grid
        container
        sx={{
          my: "50px",
          mx: "150px",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
          sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
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
            <Typography component="h1" variant="h5">
              Welcome to Okhati
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
                <Grid item xs={12}>
                  <Collapse in={!!error}>
                    <Alert severity="error">{error}</Alert>
                  </Collapse>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Email Address"
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                    {...register("email", {
                      required: "Email Address is required!",
                      pattern: {
                        value: emailValidationRegex,
                        message: "Email is not valid!",
                      },
                    })}
                    {...reusableProps}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                    {...register("password", {
                      required: "Password is required!",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long!",
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...reusableProps}
                  />
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
                disableElevation
                disableRipple
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
              <Grid container>
                <Grid item>
                  <RouterLink
                    to="/"
                    style={{
                      textDecoration: "underline",
                      color: "#2f59adb7",
                    }}
                  >
                    {"Don't have an account? Register"}
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/user/aaronburden)",
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
        ></Grid>
      </Grid>
    </Grid>
  );
}
