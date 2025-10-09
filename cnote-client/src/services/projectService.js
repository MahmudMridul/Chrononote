import { apiRequest } from "../api/api";

export const fetchAllProjects = async (userId) => {
  try {
    const res = await apiRequest("project/all", "POST", false, false, userId);
    return res?.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
