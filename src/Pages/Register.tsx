import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// RFC5322 standard email validation
const emailValidationRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordValidationRegex = /^(?=.*[0-9])(?=.*[A-Za-z])(?!.* ).{8,16}$/;

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IRegisterData>();

  const onSubmit: SubmitHandler<IRegisterData> = (data) => {
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(data));

    if (localStorage.getItem("user")) {
      setTimeout(() => {
        enqueueSnackbar("Successfully registered!", {
          variant: "success",
        });
        setLoading(false);
        navigate("/login");
      }, 1500);
    } else {
      setLoading(false);
      enqueueSnackbar("Error registering!", {
        variant: "error",
      });
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
        transition: "all 0.3s ease-in-out",
        background:
          "linear-gradient(155deg, rgba(0,255,231,1) 0%, rgba(0,255,239,1) 46%, rgba(19,118,142,1) 98%)",
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
              my: 10,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to Okhati
            </Typography>
            <Typography variant="caption" sx={{ color: "#bcbaba" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Typography>
            <Box
              sx={{
                mt: 5,
                mx: 4,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="First Name"
                    autoFocus
                    error={!!errors.firstName}
                    helperText={errors.firstName && errors.firstName.message}
                    {...register("firstName", {
                      required: "First Name is required!",
                    })}
                    {...reusableProps}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName && errors.lastName.message}
                    {...register("lastName", {
                      required: "Last Name is required!",
                    })}
                    {...reusableProps}
                  />
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
                      pattern: {
                        value: passwordValidationRegex,
                        message:
                          "Password must contain at least one number and one letter!",
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
                <Grid item xs={12}>
                  <TextField
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required!",
                      validate: (value) => {
                        if (value !== control._formValues["password"]) {
                          return "Passwords must match";
                        }
                        return undefined;
                      },
                    })}
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
                {loading ? "Loading..." : "Register"}
              </Button>
              <Grid container>
                <Grid item>
                  <RouterLink
                    to="/login"
                    style={{
                      textDecoration: "underline",
                      color: "#2f59adb7",
                    }}
                  >
                    {"Already have an account? Login"}
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
              "url(https://source.unsplash.com/user/anniespratt)",
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
