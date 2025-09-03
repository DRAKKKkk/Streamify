import { createSlice } from "@reduxjs/toolkit";
const likeSlice = createSlice({
  name: "like",
  initialState: { likes: [] },
  reducers: {},
});
export default likeSlice.reducer;