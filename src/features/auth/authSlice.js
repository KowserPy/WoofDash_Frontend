import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth";

// Load user and token from localStorage (if available)
const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	isError: false,
	isLoading: false,
	isSuccess: false,
};

// createUser async thunk
export const createUser = createAsyncThunk("auth/createUser", async (initData) => {
	const response = await loginUser(initData);
	return response;
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null;
			state.token = null;
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			// Clear from localStorage when logging out
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
				// Persist user and token in localStorage
				localStorage.setItem("user", JSON.stringify(action.payload.user));
				localStorage.setItem("token", action.payload.token);
			})
			.addCase(createUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
