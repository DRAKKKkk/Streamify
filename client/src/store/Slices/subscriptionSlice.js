import { createSlice } from "@reduxjs/toolkit";
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: { subscriptions: [] },
  reducers: {},
});
export default subscriptionSlice.reducer;