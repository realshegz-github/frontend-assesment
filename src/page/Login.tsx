import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { loginSchema } from "../utils/hooks/schema";
import InputField from "../components/common/InputField";
import type { InferType } from "yup";
import loginImg from "../assets/starwars.png";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  type LoginFormInputs = InferType<typeof loginSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form Data:", data);
        navigate("/app");
        resolve(true);
      }, 1000);
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          flex: "1 1 25%",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
        }}
      >
        <Box
          component="img"
          sx={{
            objectFit: "contain",
          }}
          alt="Company logo or illustration."
          src={loginImg}
        />
      </Box>

      <Box
        component={Paper}
        elevation={6}
        square
        sx={{
          flex: "1 1 50.67%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "467px",
            py: 5,
            px: 6,
          }}
          className="sm:border sm:border-[#A4A7B7] sm:rounded-lg"
        >
          <div className="mb-4">
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography variant="body1" sx={{ color: "#737373" }}>
              Kindly enter your details to log in
            </Typography>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  margin="normal"
                  // required
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  margin="normal"
                  // required
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              // disabled={isSubmitting}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.25,
                borderRadius: "6px",
                bgcolor: "#0A74DC",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Log in"
              )}
            </Button>

            <div>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#0A74DC",
                  cursor: "pointer",
                  mb: 8,
                }}
              >
                Forgot your password?
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  display: "block",
                  color: "#B0B9C8",
                }}
              >
                <span
                  style={{
                    color: "#303B54",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span
                  style={{
                    color: "#303B54",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Terms & Conditions
                </span>
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
