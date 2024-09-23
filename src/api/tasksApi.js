import axiosInstance from "./axiosInstance";

export const fetchTasksFromApi = async () => {
	const response = await axiosInstance.get("/tasks/incomplete-tasks");
	return response.data;
};
