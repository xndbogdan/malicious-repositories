import localized from "helpers/localized";
import { feedbackApi } from "./FeedbackApi";
import { setError, setInfo, setLoading } from "modules/main/store/MainSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { translateCodes } from "helpers/translateCodes";

export const fetchSuggest = createAsyncThunk(
  "fetchSuggest",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await feedbackApi.suggest(data);
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setInfo(localized.sendThank));
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);

export const fetchProblem = createAsyncThunk(
  "fetchProblem",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await feedbackApi.problem(data);
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setInfo(localized.sendThank));
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);
