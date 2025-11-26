import type { ATSAnalysis } from "@shared/schema";

interface AnalyzeResumeParams {
  resumeFile: File;
  jobDescription?: string;
}

export async function analyzeResume({ resumeFile, jobDescription }: AnalyzeResumeParams): Promise<ATSAnalysis> {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  if (jobDescription && jobDescription.trim()) {
    formData.append("jobDescription", jobDescription);
  }

  const response = await fetch("/api/analyze-resume", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}
