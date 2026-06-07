const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  try {
    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "jobDescription is required" });
    }

    if (!req.file && !selfDescription) {
      return res.status(400).json({
        message: "Resume or Self Description required",
      });
    }

    let resumeContent = "";

    if (req.file && req.file.buffer) {
      try {
        const pdfData = await pdfParse(req.file.buffer);
        resumeContent = pdfData.text || "";
      } catch (err) {
        console.log("PDF ERROR:", err.message);
      }
    }

    const aiData = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user?.id || "test-user",
      resume: resumeContent,
      selfDescription,
      jobDescription,

      title: aiData.title,
      matchScore: aiData.matchScore,
      technicalQuestions: aiData.technicalQuestions,
      behavioralQuestions: aiData.behavioralQuestions,
      skillGaps: aiData.skillGaps,
      preparationPlan: aiData.preparationPlan,
    });

    return res.status(201).json({
      message: "Interview report generated",
      interviewReport,
    });
  } catch (err) {
    console.log("CONTROLLER ERROR:", err.message);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    const report = await interviewReportModel.findById(interviewId);

    return res.status(200).json({
      interviewReport: report,
    });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
}

async function getAllInterviewReportController(req, res) {
  try {
    const reports = await interviewReportModel.find();

    return res.status(200).json({
      interviewReports: reports,
    });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportController,
};