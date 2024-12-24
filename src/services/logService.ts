import axiosInstance from "@/lib/axiosInstance";

export const fetchLoginStreak = async () => {
  try {
    const response = await axiosInstance.get(`/activity/streak`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch login streak:", error);
    throw error;
  }
};
