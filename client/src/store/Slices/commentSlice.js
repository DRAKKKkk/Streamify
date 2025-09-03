import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [] },
  reducers: {},
});
export default commentSlice.reducer;