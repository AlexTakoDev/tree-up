import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
};

const userProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;