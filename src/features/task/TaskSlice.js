import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksFromApi } from "../../api/tasksApi";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	const tasks = await fetchTasksFromApi();
	return tasks;
});

const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		incompleteTasks: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearTasks: (state) => {
			state.incompleteTasks = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				console.log(action.payload);
				state.loading = false;
				state.incompleteTasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
