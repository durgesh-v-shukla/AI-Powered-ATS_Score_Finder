import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { JobDescriptionInput } from "@/components/job-description-input";
import { ResultsDashboard } from "@/components/results-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { analyzeResume } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Search, Shield, ShieldCheck } from "lucide-react";
import type { ATSAnalysis } from "@shared/schema";

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState<ATSAnalysis | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: analyzeResume,
    onSuccess: (data) => {
      setResults(data);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been successfully analyzed!",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An error occurred during analysis",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload a resume file to continue",
        variant: "destructive",
      });
      return;
    }

    analyzeMutation.mutate({ resumeFile, jobDescription });
  };

  const handleNewAnalysis = () => {
    setResults(null);
    setResumeFile(null);
    setJobDescription("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Search className="text-primary text-2xl h-8 w-8" />
              <h1 className="text-2xl font-bold text-foreground">ATS Score Finder</h1>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm">Secure & Private</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!results ? (
          <>
            {/* Upload Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <FileUpload 
                file={resumeFile} 
                onFileChange={setResumeFile}
                data-testid="file-upload-section"
              />
              <JobDescriptionInput 
                value={jobDescription}
                onChange={setJobDescription}
                data-testid="job-description-section"
              />
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleAnalyze}
                disabled={analyzeMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors shadow-sm"
                data-testid="button-analyze"
              >
                <Search className="h-4 w-4" />
                <span>{analyzeMutation.isPending ? "Analyzing..." : "Analyze Resume"}</span>
              </Button>
            </div>

            {/* Loading State */}
            {analyzeMutation.isPending && (
              <Card className="shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Analyzing Resume...</h3>
                    <p className="text-muted-foreground">Our AI is comparing your resume against the job requirements</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <ResultsDashboard 
            results={results} 
            onNewAnalysis={handleNewAnalysis}
            data-testid="results-dashboard"
          />
        )}
      </main>
    </div>
  );
}
