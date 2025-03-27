import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const setlogin = createAsyncThunk(
  "auth/login",
  async (authInfo: any) => {
    try {
      const res = await api.post("/auth", authInfo);
      return res;
    } catch (error) {
      console.error("Error Authentication.");
      return {
        success: false,
        error: "Error Login"
      };
    }
  }
);

export const setlogout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await api.authPost("/logout");
    return true;
  } catch (error) {
    console.error("Error Authentication.");
    return false;
  }
});

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (authInfo: any) => {
    try {
      const res = await api.post("/createaccount", authInfo);
      return res;
    } catch (error) {
      console.error("Error Create User.");
      return { success: false, error: "Error Create User" };
    }
  }
);
