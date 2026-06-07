import React, { useEffect, useState } from "react";
import "./interview.scss";

import { useParams } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const { interviewId } = useParams();

  const { report, loading, getReportById } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading) {
    return (
      <main>
        <h1>Loading Interview Report...</h1>
      </main>
    );
  }

  if (!report) {
    return (
      <main>
        <h1>No Report Found</h1>
      </main>
    );
  }

  return (
    <main className="interview-page">
      <div className="interview-layout">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <p className="section-title">SECTIONS</p>

          <button
            className={activeTab === "technical" ? "active" : ""}
            onClick={() => setActiveTab("technical")}
          >
            Technical Questions
          </button>

          <button
            className={activeTab === "behavioral" ? "active" : ""}
            onClick={() => setActiveTab("behavioral")}
          >
            Behavioral Questions
          </button>

          <button
            className={activeTab === "roadmap" ? "active" : ""}
            onClick={() => setActiveTab("roadmap")}
          >
            Preparation Plan
          </button>
        </aside>

        {/* CENTER */}
        <section className="content">
          <div className="job-title">
            <h1>{report.title}</h1>
          </div>

          {/* TECHNICAL */}
          {activeTab === "technical" && (
            <>
              <div className="content-header">
                <h2>Technical Questions</h2>
                <span>
                  {report?.technicalQuestions?.length} Questions
                </span>
              </div>

              <div className="question-list">
                {report?.technicalQuestions?.map((q, index) => (
                  <div key={index} className="question-card">
                    <span className="question-id">Q{index + 1}</span>

                    <div>
                      <h4>{q.question}</h4>
                      <p>
                        <strong>Intention:</strong> {q.intention}
                      </p>
                      <p>
                        <strong>Sample Answer:</strong> {q.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* BEHAVIORAL */}
          {activeTab === "behavioral" && (
            <>
              <div className="content-header">
                <h2>Behavioral Questions</h2>
              </div>

              <div className="question-list">
                {report?.behavioralQuestions?.map((q, index) => (
                  <div key={index} className="question-card">
                    <span className="question-id">Q{index + 1}</span>

                    <div>
                      <h4>{q.question}</h4>
                      <p>
                        <strong>Intention:</strong> {q.intention}
                      </p>
                      <p>
                        <strong>Sample Answer:</strong> {q.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ROADMAP */}
          {activeTab === "roadmap" && (
            <>
              <div className="content-header">
                <h2>Preparation Roadmap</h2>
              </div>

              <div className="question-list">
                {report?.preparationPlan?.map((plan, index) => (
                  <div key={index} className="question-card">
                    <span className="question-id">Day {plan.day}</span>

                    <div>
                      <h4>{plan.focus}</h4>

                      <ul>
                        {plan.tasks?.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* RIGHT PANEL */}
        <aside className="right-panel">
          <div className="score-card">
            <p>MATCH SCORE</p>

            <div className="score-circle">
              <span>{report.matchScore}%</span>
            </div>

            <small>AI Generated Analysis</small>
          </div>

          <div className="skill-gap-card">
            <h4>SKILL GAPS</h4>

            {report?.skillGaps?.map((skill, index) => (
              <div key={index} className={`skill ${skill.severity}`}>
                {skill.skill}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;