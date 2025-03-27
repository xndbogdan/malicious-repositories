import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (params: any) => {
    try {
      const res = await api.get("/getallblogs", params);
      return res.data;
    } catch (error) {
      console.error("Error to get all blogs.");
      return {
        blogCount: 0,
        currentPage: 1,
        items: [],
        totalPages: 1
      };
    }
  }
);

export const getBlog = createAsyncThunk("/showpost", async (params: any) => {
  try {
    const res = await api.get("/showpost", params);
    return res;
  } catch (error) {
    console.error("Error to get blog.");
    return {
      success: false,
      error: "Error to get blog."
    };
  }
});

export const getBlogByID = createAsyncThunk(
  "getBlogByID",
  async (params: any) => {
    try {
      const res = await api.get(`/blog/${params.blogId}`);
      return res;
    } catch (error) {
      console.error("Error to get blog.");
      return {
        success: false,
        error: "Error to get blog."
      };
    }
  }
);

export const deleteBlog = createAsyncThunk("/delpost", async (params: any) => {
  try {
    const res = await api.authPost("/delpost", params);
    return res;
  } catch (error) {
    console.error("Error to delete blog.");
    return {
      success: false,
      error: "Error to delete blog."
    };
  }
});

export const addBlog = createAsyncThunk("/addpost", async (params: any) => {
  try {
    const res = await api.formPost("/addpost/add", params);
    return res;
  } catch (error) {
    console.error("Error to add blog.");
    return {
      success: false,
      error: "Error to add blog."
    };
  }
});

export const editBlog = createAsyncThunk("/editpost", async (params: any) => {
  try {
    const res = await api.formPost(
      `/editpost/${params.blogId}`,
      params.formData
    );
    return res;
  } catch (error) {
    console.error("Error to edit blog.");
    return {
      success: false,
      error: "Error to edit blog."
    };
  }
});
