import axiosInstance from "@/lib/axiosInstance";

export const fetchCertificates = async () => {
  try {
    const response = await axiosInstance.get(`/certificates`);
    return response.data.certificates;
  } catch (error) {
    console.error("Failed to fetch login streak:", error);
    throw error;
  }
};

export const fetchCertificate = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch login streak:", error);
    throw error;
  }
};
