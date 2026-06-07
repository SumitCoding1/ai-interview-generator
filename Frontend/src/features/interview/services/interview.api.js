import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// 🔥 FIXED: FORM DATA FOR FILE UPLOAD
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  const response = await API.post("/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getInterviewReportById = async (id) => {
  const response = await API.get(`/interview/report/${id}`);
  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await API.get("/interview");
  return response.data;
};