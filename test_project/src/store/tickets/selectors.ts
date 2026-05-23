import type { RootState } from "../store";

export const selectAllTickets = (state: RootState) => state.ticket.tickets;
export const selectTicketDetail = (state: RootState) =>
  state.ticket.ticketDetail;

export const selectStatusTicket = (state: RootState) => state.ticket.status;
export const selectErrorTicket = (state: RootState) => state.ticket.error;
export const selectUpdateResponseTicket = (state: RootState) =>
  state.ticket.updateResponse;
