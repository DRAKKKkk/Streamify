import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: { tweets: [] },
  reducers: {},
});
export default tweetSlice.reducer;