import { apiRequest } from "../api/api";

export const fetchAllProjects = async () => {
  try {
    const res = await apiRequest("project/all", "GET", false, false);
    return res?.data || [];
  }
  catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}