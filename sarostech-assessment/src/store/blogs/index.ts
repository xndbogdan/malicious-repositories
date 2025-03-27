import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllBlogs,
  getBlog,
  deleteBlog,
  addBlog,
  editBlog,
  getBlogByID
} from "./actions";

const PREFIX = "blog";

const initialState: any = {
  status: false,
  blogCount: 0,
  currentPage: 1,
  items: [],
  totalPages: 1,
  search: "",
  blogdetail: {},
  error: "",
  updateResponse: false,
  loading: false
};

const setAllBlogs = (state: any, data: any) => {
  state.blogCount = data.blogCount;
  state.currentPage = data.currentPage;
  state.items = data.items;
  state.totalPages = data.totalPages;
  state.search = data.search;
  state.loading = true;
};

const setBlog = (state: any, res: any) => {
  if (res.success) {
    state.blogdetail = res.data.item;
  } else {
    state.blogdetail = {};
  }
};

const addBlogData = (state: any, data: any) => {
  state.status = data.success;
  state.error = data.error;
  state.updateResponse = !state.updateResponse;
};

const editBlogData = (state: any, data: any) => {
  state.status = data.success;
  state.error = data.error;
  state.updateResponse = !state.updateResponse;
};

const delBlogData = (state: any, res: any) => {
  if (res.success) {
    const newItems = state.items.filter((item: any) => item.id !== res.data.id);
    state.items = newItems;
  } else {
    state.status = res.success;
    state.error = res.error;
    state.updateResponse = !state.updateResponse;
  }
};

export const blogReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    formatBlogStatus: (state: any) => {
      state.status = false;
      state.error = "";
      state.updateResponse = !state.updateResponse;
      state.loading = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(
      getAllBlogs.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setAllBlogs(state, action.payload);
      }
    );
    builder.addCase(
      getBlog.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setBlog(state, action.payload);
      }
    );
    builder.addCase(
      getBlogByID.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setBlog(state, action.payload);
      }
    );
    builder.addCase(
      addBlog.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        addBlogData(state, action.payload);
      }
    );
    builder.addCase(
      editBlog.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        editBlogData(state, action.payload);
      }
    );
    builder.addCase(
      deleteBlog.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        delBlogData(state, action.payload);
      }
    );
  }
});

export const { formatBlogStatus } = blogReducer.actions;
export { getAllBlogs, getBlog, deleteBlog, addBlog, editBlog, getBlogByID };
export default blogReducer.reducer;
