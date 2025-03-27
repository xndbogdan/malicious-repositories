import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { getCookie } from "../../utils/cookie";

export const getAllTickets = createAsyncThunk(
  "tickets/getAllTickets",
  async (params: any) => {
    try {
      if (getCookie("username") && getCookie("username") !== "undefined") {
        const res = await api.authPost("/tickets/getList", params);
        return res.data;
      } else {
        const res = await api.post("/tickets/getList", params);
        return res.data;
      }
    } catch (error) {
      console.error("Error to get all tickets.");
    }
  }
);

export const getTicketDetail = createAsyncThunk(
  "tickets/getTicketDetail",
  async (params: any) => {
    try {
      const res = await api.get(`/ticket/${params.ticketID}`);
      return res.data;
    } catch (error) {
      console.error("Error to get ticket detail.");
    }
  }
);

export const replyTicket: any = createAsyncThunk(
  "tickets/replyTicket",
  async (params: any) => {
    try {
      if (getCookie("username") && getCookie("username") !== "undefined") {
        const res = await api.authPost(
          `/ticket/reply/${params.ticketID}`,
          params
        );
        return res;
      } else {
        const res = await api.post(`/ticket/reply/${params.ticketID}`, params);
        return res;
      }
    } catch (error) {
      console.error("Error to reply ticket.");
      return {
        success: false,
        error: "Error to reply ticket.",
      };
    }
  }
);

export const closeTicket: any = createAsyncThunk(
  "tickets/closeTicket",
  async (params: any) => {
    try {
      const res = await api.post(`/ticket/close/${params.ticketID}`);
      return res.data;
    } catch (error) {
      console.error("Error to close ticket.");
    }
  }
);

export const addTicket: any = createAsyncThunk(
  "tickets/addTicket",
  async (params: any) => {
    try {
      const res = await api.post(`/contact/sendmsg`, params);
      return res;
    } catch (error) {
      console.error("Error to add ticket.");
      return {
        success: false,
        error: "Error to add ticket.",
      };
    }
  }
);
