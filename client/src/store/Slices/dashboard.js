import { createSlice } from "@reduxjs/toolkit";
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { loading: false, channelStats: null, channelVideos: [] },
  reducers: {},
});
export default dashboardSlice.reducer;