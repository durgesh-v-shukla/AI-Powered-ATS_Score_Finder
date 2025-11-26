import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, Clipboard } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  "data-testid"?: string;
}

export function JobDescriptionInput({ value, onChange, "data-testid": testId }: JobDescriptionInputProps) {
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <Card className="shadow-sm" data-testid={testId}>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Briefcase className="text-primary mr-2 h-5 w-5" />
          Job Description <span className="text-sm font-normal text-muted-foreground ml-2">(Optional)</span>
        </h2>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Paste the job description here for targeted analysis, or leave blank for general ATS evaluation..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-40 resize-none"
            data-testid="textarea-job-description"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              <span data-testid="text-char-count">{value.length}</span> characters
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePasteFromClipboard}
              className="text-xs text-primary hover:text-primary/80"
              data-testid="button-paste-clipboard"
            >
              <Clipboard className="h-3 w-3 mr-1" />
              Paste from clipboard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
