import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type data = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
} | null;
// Define the user type
export type TUser = {
  _id?: string;
  data: data,
  role?:string
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
} | null;

// Define the authentication state type
type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Set the initial state
const initialState: TAuthState = {
  user: null,
  token: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user and token after successful login
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    // Clear user and token on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    //update
    updateUser: (state, action: PayloadAction<{ data: TUser }>) => {
      if (state.user && action?.payload?.data?.data) {
        state.user = { ...state.user, ...action.payload.data.data };
      }
    },
  },
});

// Export actions
export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors to access authentication state
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
