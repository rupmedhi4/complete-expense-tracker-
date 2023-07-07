import { createSlice } from "@reduxjs/toolkit";

const toggleThemeSlice = createSlice({
  name: "toggleThemeSlice",
  initialState: {
    theme: "light",
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      console.log(  state.theme)
    },
  },
});

export const { toggleTheme } = toggleThemeSlice.actions;
export default toggleThemeSlice.reducer;
