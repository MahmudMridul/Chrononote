import { apiRequest } from "../api/api";

export const fetchCurrentWeekTimeCards = async (userId) => {
  console.log(userId);
  try {
    const res = await apiRequest(
      "timecard/currentweek",
      "POST",
      false,
      false,
      userId
    );
    return res?.data || [];
  } catch (error) {
    console.error("Error fetching time cards:", error);
    return [];
  }
};

export const convertTimeCardToTableFormat = (timeCards) => {
  let copy = [...timeCards];
  copy.sort((a, b) => a.projectId - b.projectId);
  console.log("Sorted TimeCards:", copy);
};
