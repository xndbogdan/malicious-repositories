import localized from "helpers/localized";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { setError, setLoading } from "modules/main/store/MainSlice";
import { setUsers } from "./usersSlice";
import { translateCodes } from "helpers/translateCodes";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await usersApi.users();
      thunkAPI.dispatch(setUsers(response.data));
    } catch (e: any) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);
