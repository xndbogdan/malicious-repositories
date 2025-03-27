import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const getChannels = createAsyncThunk("chat/getchannel", async () => {
  try {
    const res = await api.authPost("/getchannels");
    return res;
  } catch (error) {
    console.error("Error to get channels.");
    return { success: false, error: "Error to get channels." };
  }
});

export { getChannels };
