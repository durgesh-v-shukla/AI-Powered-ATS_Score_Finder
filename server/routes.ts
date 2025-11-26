import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
// Dynamic import to avoid initialization issues
// import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { analyzeResumeSchema } from "@shared/schema";
import { z } from "zod";

// Extend Express Request type to include file property from multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === "application/pdf" || 
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

async function validateFileBuffer(file: Express.Multer.File): Promise<void> {
  // Basic file validation based on content
  if (file.mimetype === "application/pdf") {
    const pdfHeader = file.buffer.toString('ascii', 0, 4);
    if (!pdfHeader.startsWith('%PDF')) {
      throw new Error("Invalid PDF file: File does not contain valid PDF header");
    }
  } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    // DOCX files are ZIP archives, check for ZIP signature
    const zipHeader = file.buffer.toString('hex', 0, 4);
    if (zipHeader !== '504b0304' && zipHeader !== '504b0506' && zipHeader !== '504b0708') {
      throw new Error("Invalid DOCX file: File does not contain valid ZIP structure");
    }
  }
  
  // Check file size (should have some content)
  if (file.buffer.length < 100) {
    throw new Error("File appears to be too small or empty");
  }
}

async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  // Validate file first
  await validateFileBuffer(file);
  
  if (file.mimetype === "application/pdf") {
    try {
      // Use dynamic import with forced CommonJS module loading
      const pdfParseModule = await import("pdf-parse");
      const pdfParse = pdfParseModule.default || pdfParseModule;
      const data = await pdfParse(file.buffer);
      
      if (!data.text || data.text.trim().length === 0) {
        throw new Error("No text content found in PDF");
      }
      
      return data.text;
    } catch (error) {
      console.error("PDF parsing error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      if (errorMessage.includes("Invalid PDF") || errorMessage.includes("bad XRef")) {
        throw new Error("The PDF file appears to be corrupted or invalid. Please try uploading a different PDF file.");
      }
      throw new Error(`Failed to extract text from PDF: ${errorMessage}`);
    }
  } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      
      if (!result.value || result.value.trim().length === 0) {
        throw new Error("No text content found in DOCX file");
      }
      
      return result.value;
    } catch (error) {
      console.error("DOCX parsing error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      if (errorMessage.includes("Corrupted zip") || errorMessage.includes("central directory")) {
        throw new Error("The DOCX file appears to be corrupted or invalid. Please try uploading a different DOCX file.");
      }
      throw new Error(`Failed to extract text from DOCX: ${errorMessage}`);
    }
  } else {
    throw new Error("Unsupported file type");
  }
}

async function callDeepseekAPI(resumeText: string, jobDescription?: string) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("OpenRouter API key not configured. Please set OPENROUTER_API_KEY in your environment variables.");
  }

  const hasJobDescription = jobDescription && jobDescription.trim();
  
  const prompt = hasJobDescription 
    ? `You are an expert ATS (Applicant Tracking System) evaluator and career coach.

Analyze the following resume against the provided job description and return a comprehensive evaluation.

INSTRUCTIONS:
1. Calculate an ATS compatibility score (0-100) based on:
   - Keyword matching and relevance
   - Required vs optional skills alignment
   - Experience level match
   - Industry-specific terminology
   - Overall qualification fit

2. Identify matched skills with specific examples from the resume
3. List critical missing keywords that could hurt ATS ranking
4. Detect formatting and structural issues that affect ATS parsing
5. Provide actionable, specific improvement suggestions

6. Consider these ATS best practices in your evaluation:
   - Use of standard section headers
   - Keyword density and placement
   - Skills vs experience alignment
   - Quantifiable achievements
   - Industry-relevant terminology

JOB DESCRIPTION:
${jobDescription}

---

RESUME TEXT:
${resumeText}

---

RESPOND WITH ONLY VALID JSON IN THIS EXACT FORMAT:
{
  "ats_score": <number between 0-100>,
  "skills_matched": ["skill1 with context", "skill2 with context"],
  "missing_keywords": ["critical keyword1", "important keyword2"],
  "formatting_issues": ["specific issue1", "specific issue2"],
  "suggestions": ["actionable suggestion1", "actionable suggestion2"]
}`
    : `You are an expert ATS (Applicant Tracking System) evaluator and career coach.

Analyze the following resume for general ATS compatibility and provide comprehensive feedback.

INSTRUCTIONS:
1. Calculate a general ATS compatibility score (0-100) based on:
   - Resume formatting and structure
   - Use of standard section headers
   - Keyword density and professional terminology
   - Skills presentation and organization
   - Overall ATS-friendly formatting

2. Identify the key skills and strengths present in the resume
3. Suggest important keywords and skills that could enhance ATS ranking
4. Detect formatting and structural issues that affect ATS parsing
5. Provide actionable suggestions for general resume improvement

6. Focus on these ATS best practices:
   - Clear section organization
   - Professional formatting
   - Skills vs experience alignment
   - Quantifiable achievements
   - Industry-standard terminology usage

RESUME TEXT:
${resumeText}

---

RESPOND WITH ONLY VALID JSON IN THIS EXACT FORMAT:
{
  "ats_score": <number between 0-100>,
  "skills_matched": ["skill1 identified", "skill2 identified"],
  "missing_keywords": ["recommended keyword1", "recommended keyword2"],
  "formatting_issues": ["specific issue1", "specific issue2"],
  "suggestions": ["actionable suggestion1", "actionable suggestion2"]
}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.APP_URL || "http://localhost:5000",
      "X-Title": "ATS Score Finder - Resume Analysis Tool"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS evaluator and career coach. Always respond with valid JSON only. Be precise, actionable, and helpful in your analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 3000,
      top_p: 0.9
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }

  clearTimeout(timeoutId);
  const data = await response.json();
  const aiResponse = data.choices[0]?.message?.content;
  
  if (!aiResponse) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(aiResponse);
  } catch (error) {
    // Try to extract JSON from the response if it's wrapped in text
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid JSON response from AI");
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/analyze-resume", upload.single("resume"), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      const validation = analyzeResumeSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid request data",
          errors: validation.error.errors 
        });
      }

      const { jobDescription } = validation.data;

      // Extract text from uploaded file
      const resumeText = await extractTextFromFile(req.file);
      
      if (!resumeText.trim()) {
        return res.status(400).json({ message: "Could not extract text from resume file" });
      }

      // Call Deepseek API with optional job description
      const analysis = await callDeepseekAPI(resumeText, jobDescription);
      
      // Validate AI response structure
      const validatedAnalysis = z.object({
        ats_score: z.number().min(0).max(100),
        skills_matched: z.array(z.string()),
        missing_keywords: z.array(z.string()),
        formatting_issues: z.array(z.string()),
        suggestions: z.array(z.string()),
      }).parse(analysis);

      res.json(validatedAnalysis);
      
    } catch (error) {
      console.error("Resume analysis error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid AI response format",
          details: error.errors 
        });
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return res.status(408).json({ message: "Analysis request timed out. Please try again." });
        }
        return res.status(500).json({ message: error.message });
      }
      
      res.status(500).json({ message: "Internal server error during analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
