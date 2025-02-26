import localized from "helpers/localized";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setLoading, setPage } from "./MainSlice";
import { fetchUser } from "modules/user/store/userAC";
import { fetchUsers } from "modules/users/store/usersAC";
import { mainApi } from "./MainApi";
import { translateCodes } from "helpers/translateCodes";

export const fetchCheckToken = createAsyncThunk(
  "fetchCheckToken",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await mainApi.checkToken();
      if (response.status) {
        await thunkAPI.dispatch(fetchData());
      }
    } catch (e: any) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setPage("auth"));
    }
  },
);

export const fetchData = createAsyncThunk("fetchData", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    await thunkAPI.dispatch(fetchUser());
    await thunkAPI.dispatch(fetchUsers());

    thunkAPI.dispatch(setLoading(false));
    thunkAPI.dispatch(setPage("game"));
  } catch (e: any) {
    thunkAPI.dispatch(setLoading(false));
    thunkAPI.dispatch(
      setError(translateCodes(e.response.data.code) || localized.error),
    );
  }
});
