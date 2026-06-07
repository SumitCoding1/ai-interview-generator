import React, { useState, useRef } from "react";
import "./home.scss";

import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      const resumeFile = resumeInputRef.current?.files?.[0];

      if (!jobDescription.trim()) {
        alert("Please enter Job Description");
        return;
      }

      if (!resumeFile && !selfDescription.trim()) {
        alert("Upload Resume or Enter Self Description");
        return;
      }

      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      if (data?._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Generating Report...</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="interview-container">
        <div className="header">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>

          <p>
            Let our AI analyze the job requirements and your profile to build a
            winning strategy.
          </p>
        </div>

        <div className="interview-input-group">
          <div className="left">
            <div className="card-header">
              <h3>🎯 Target Job Description</h3>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
            />
          </div>

          <div className="right">
            <div className="card-header">
              <h3>👤 Your Profile</h3>
            </div>

            <div className="input-group">
              <p>
                Upload Resume{" "}
                <small className="highlight">(PDF Recommended)</small>
              </p>

              <label className="file-label" htmlFor="resume">
                <span>☁️</span>
                <p>Click to upload or drag & drop</p>
                <small>PDF only • Max 5MB</small>
              </label>

              <input
                ref={resumeInputRef}
                hidden
                type="file"
                id="resume"
                accept=".pdf"
              />
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription">
                Quick Self Description
              </label>

              <textarea
                id="selfDescription"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience, skills and projects..."
              />
            </div>

            <div className="info-box">
              Either a Resume or Self Description is required to generate a
              personalized plan.
            </div>
          </div>
        </div>

        <div className="footer">
          <button onClick={handleGenerateReport} className="generate-btn">
            ✨ Generate My Interview Strategy
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;