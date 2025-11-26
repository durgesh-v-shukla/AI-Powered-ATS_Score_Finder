import { z } from "zod";

export const analyzeResumeSchema = z.object({
  jobDescription: z.string().optional(),
});

export const atsAnalysisSchema = z.object({
  ats_score: z.number().min(0).max(100),
  skills_matched: z.array(z.string()),
  missing_keywords: z.array(z.string()),
  formatting_issues: z.array(z.string()),
  suggestions: z.array(z.string()),
});

export type AnalyzeResumeRequest = z.infer<typeof analyzeResumeSchema>;
export type ATSAnalysis = z.infer<typeof atsAnalysisSchema>;
