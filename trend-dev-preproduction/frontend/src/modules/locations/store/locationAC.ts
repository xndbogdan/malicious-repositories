import localized from "helpers/localized";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { locationApi } from "./locationApi";
import { setLocation } from "modules/user/store/userSlice";
import { setError } from "modules/main/store/MainSlice";
import { translateCodes } from "helpers/translateCodes";

export const fetchLocation = createAsyncThunk(
  "fetchLocation",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLocation(data));
      const response = await locationApi.location(data);
    } catch (e) {
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);
