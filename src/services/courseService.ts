/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";

// Function to fetch all courses
export const getCourses = async () => {
  try {
    const response = await axiosInstance.get("/courses");
    return response.data; // Return course data
  } catch (error: any) {
    console.error("Failed to fetch courses:", error.message);
    throw error; // Handle error
  }
};

export const getCourseDescription = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/courses/${id}/description`); // API endpoint
    return response.data; // Return the fetched data
  } catch (error: any) {
    console.error("Failed to fetch course description:", error.message);
    throw error; // Re-throw error for handling in UI
  }
};
