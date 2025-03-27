import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllTickets,
  getTicketDetail,
  replyTicket,
  closeTicket,
  addTicket,
} from "./actions";

const PREFIX = "ticket";

const initialState: any = {
  tickets: [],
  ticketDetail: [],
  status: false,
  error: "",
  updateResponse: false,
};

const setAllTickets = (state: any, data: any) => {
  state.tickets = data?.ticketList || [];
};
const setTicketDetail = (state: any, data: any) => {
  state.ticketDetail = data?.tickets;
};
const replyTicketDetail = (state: any, res: any) => {
  if (res.success) {
    state.status = res.success;
    state.error = "";
    state.updateResponse = !state.updateResponse;
    state.ticketDetail.push(res.data);
  } else {
    state.status = res.success;
    state.error = res.error;
    state.updateResponse = !state.updateResponse;
  }
};
const addNewTicket = (state: any, res: any) => {
  if (res.success) {
    const existingListString = localStorage.getItem("ticket");
    const existingList = existingListString
      ? JSON.parse(existingListString)
      : [];
    existingList.push(res.data.ticketID);
    const updatedListString = JSON.stringify(existingList);
    localStorage.setItem("ticket", updatedListString);
    state.status = res.success;
    state.error = "";
    state.updateResponse = !state.updateResponse;
  } else {
    state.status = res.success;
    state.error = res.error;
    state.updateResponse = !state.updateResponse;
  }
};

export const ticketReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    formatTicketStatus: (state: any) => {
      state.status = false;
      state.error = "";
      state.updateResponse = !state.updateResponse;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllTickets.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setAllTickets(state, action.payload);
      }
    );
    builder.addCase(
      getTicketDetail.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setTicketDetail(state, action.payload);
      }
    );
    builder.addCase(
      replyTicket.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        replyTicketDetail(state, action.payload);
      }
    );
    builder.addCase(
      addTicket.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        addNewTicket(state, action.payload);
      }
    );
  },
});

export const { formatTicketStatus } = ticketReducer.actions;
export { getAllTickets, getTicketDetail, replyTicket, closeTicket, addTicket };
export default ticketReducer.reducer;
