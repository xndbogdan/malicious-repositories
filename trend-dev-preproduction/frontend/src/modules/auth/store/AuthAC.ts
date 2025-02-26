import localized from "helpers/localized";
import { authApi } from "./AuthApi";
import { setError, setLoading } from "modules/main/store/MainSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "modules/main/store/MainAC";
import { translateCodes } from "helpers/translateCodes";

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await authApi.login(data);
      localStorage.setItem("token", response.data.token);
      thunkAPI.dispatch(fetchData());
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(
        setError(
          translateCodes(
            translateCodes(e.response.data.code) || localized.error,
          ),
        ),
      );
    }
  },
);

export const fetchRegistration = createAsyncThunk(
  "fetchRegistration",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await authApi.registration(data);
      localStorage.setItem("token", response.data.token);
      thunkAPI.dispatch(fetchData());
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(
        setError(
          translateCodes(
            translateCodes(e.response.data.code) || localized.error,
          ),
        ),
      );
    }
  },
);
