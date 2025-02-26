import localized from "helpers/localized";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { setUser, setLang } from "./userSlice";
import { setError, setLanguage } from "modules/main/store/MainSlice";
import { translateCodes } from "helpers/translateCodes";

export const fetchUser = createAsyncThunk("fetchUser", async (_, thunkAPI) => {
  try {
    const response = await userApi.user();
    thunkAPI.dispatch(setUser(response.data));
    localized.setLanguage(response.data.lang);
    thunkAPI.dispatch(setLanguage(response.data.lang));
  } catch (e: any) {
    thunkAPI.dispatch(
      setError(translateCodes(e.response.data.code) || localized.error),
    );
  }
});

export const fetchExp = createAsyncThunk("fetchExp", async (data, thunkAPI) => {
  try {
    const response = await userApi.exp(data);
    thunkAPI.dispatch(setUser(response.data));
  } catch (e) {
    thunkAPI.dispatch(
      setError(translateCodes(e.response.data.code) || localized.error),
    );
  }
});

export const fetchLang = createAsyncThunk(
  "fetchLang",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.lang(data);
      thunkAPI.dispatch(setLang(data.lang));
      thunkAPI.dispatch(setLanguage(data.lang));
    } catch (e) {
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);

export const fetchQuest = createAsyncThunk(
  "fetchQuest",
  async (_, thunkAPI) => {
    try {
      const response = await userApi.quest();
      thunkAPI.dispatch(setUser(response.data));
    } catch (e) {
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);
