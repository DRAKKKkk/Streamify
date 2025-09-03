import { createSlice } from "@reduxjs/toolkit";
const playlistSlice = createSlice({
  name: "playlist",
  initialState: { playlists: [] },
  reducers: {},
});
export default playlistSlice.reducer;