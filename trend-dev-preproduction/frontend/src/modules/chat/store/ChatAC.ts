import localized from "helpers/localized";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "./ChatApi";
import { setError } from "modules/main/store/MainSlice";
import { setChat } from "./ChatSlice";
import { translateCodes } from "helpers/translateCodes";

export const fetchChat = createAsyncThunk(
  "fetchChat",
  async (data, thunkAPI) => {
    try {
      const response = await chatApi.chat(data);
      thunkAPI.dispatch(setChat(response.data.reverse()));
    } catch (e) {
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);

export const fetchChats = createAsyncThunk(
  "fetchChats",
  async (_, thunkAPI) => {
    try {
      const response = await chatApi.chats();
      thunkAPI.dispatch(setChat(response.data.reverse()));
    } catch (e) {
      thunkAPI.dispatch(
        setError(translateCodes(e.response.data.code) || localized.error),
      );
    }
  },
);
