import type { RootState } from "../store";

export const selectBlogItems = (state: RootState) => state.blog.items;
export const selectBlogCount = (state: RootState) => state.blog.blogCount;
export const selectBlogCurrentPage = (state: RootState) =>
  state.blog.currentPage;
export const selectBlogTotalPages = (state: RootState) => state.blog.totalPages;
export const selectBlogSearch = (state: RootState) => state.blog.search;
export const selectBlogDetail = (state: RootState) => state.blog.blogdetail;
export const selectStatusBlogs = (state: RootState) => state.blog.status;
export const selectErrorBlogs = (state: RootState) => state.blog.error;
export const selectUpdateResponseBlogs = (state: RootState) =>
  state.blog.updateResponse;
export const selectLoading = (state:RootState) => state.blog.loading;