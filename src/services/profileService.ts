import axiosInstance from "@/lib/axiosInstance";

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get(`/profile`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch login streak:", error);
    throw error;
  }
};
