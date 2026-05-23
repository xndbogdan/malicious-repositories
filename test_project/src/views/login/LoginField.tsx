import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import api from "../../utils/api";
import CustomTextField from "../../components/text/TextField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setlogin } from "../../store/auth";
import {
  selectErrorAuth,
  selectLoginUser,
  selectStatusAuth,
  selectUpdateResponseAuth,
} from "../../store/auth/selectors";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../store/alert";

const LoginField = () => {
  const [username, setName] = useState("");
  const [usernameErr, setNameErr] = useState(false);
  const [password, setPwd] = useState("");
  const [passwordErr, setPwdErr] = useState(false);
  const loggedinUser = useAppSelector(selectLoginUser);
  const errorAuth = useAppSelector(selectErrorAuth);
  const updateResponse = useAppSelector(selectUpdateResponseAuth);
  const statusAuth = useAppSelector(selectStatusAuth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    let successData = true;
    if (!username) {
      successData = false;
      setNameErr(true);
    }
    if (!password) {
      successData = false;
      setPwdErr(true);
    }
    if (successData) {
      dispatch(setlogin({ username, password }));
      setNameErr(false);
      setPwdErr(false);
    }
  };

  useEffect(() => {
    if (loggedinUser) {
      navigate("/");
    }
    if (!statusAuth && errorAuth !== "") {
      dispatch(showAlert({ message: errorAuth, severity: "error" }));
    }
  }, [loggedinUser, updateResponse]);

  return (
    <>
      <Stack>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Typography
            variant="subtitle1"
            component="label"
            htmlFor="username"
            color="error"
            display={usernameErr ? "block" : "none"}
          >
            Please add User Name
          </Typography>
        </Box>
        <Box mt="25px" sx={{ textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e: any) => setPwd(e.target.value)}
          />
          <Typography
            variant="subtitle1"
            component="label"
            htmlFor="password"
            color="error"
            display={passwordErr ? "block" : "none"}
          >
            Please add Password
          </Typography>
        </Box>
      </Stack>
      <Box mt="25px">
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => handleSubmit()}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default LoginField;
