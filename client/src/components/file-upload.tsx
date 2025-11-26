import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudUpload, FileText, X } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  "data-testid"?: string;
}

export function FileUpload({ file, onFileChange, "data-testid": testId }: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || 
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      onFileChange(droppedFile);
    }
  }, [onFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  }, [onFileChange]);

  const handleRemoveFile = useCallback(() => {
    onFileChange(null);
  }, [onFileChange]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="shadow-sm" data-testid={testId}>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <CloudUpload className="text-primary mr-2 h-5 w-5" />
          Upload Resume
        </h2>
        
        {!file ? (
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById("resumeFile")?.click()}
            data-testid="drop-zone"
          >
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <CloudUpload className="text-muted-foreground h-6 w-6" />
              </div>
              <div>
                <p className="text-foreground font-medium">Drop your resume here</p>
                <p className="text-muted-foreground text-sm mt-1">
                  or <span className="text-primary">browse files</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">PDF, DOCX up to 10MB</p>
            </div>
            <input
              type="file"
              id="resumeFile"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              data-testid="input-file"
            />
          </div>
        ) : (
          <div className="p-3 bg-muted rounded-lg" data-testid="file-info">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-foreground">{file.name}</span>
                <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="text-muted-foreground hover:text-destructive p-1"
                data-testid="button-remove-file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
