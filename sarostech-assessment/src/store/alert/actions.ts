import { createAsyncThunk } from '@reduxjs/toolkit'

const showAlert = createAsyncThunk('alert/show', async (msg: any) => {
  const payload = {
    message: msg.message,
    severity: msg.severity,
  }
  return payload
})

export { showAlert }
