import { Download } from "lucide-react";

const RESUME_URL = "/files/Amit_Virpara_Resume.pdf";

export const ResumeButton = ({ variant = "default" }: { variant?: "default" | "ghost" }) => {
  if (variant === "ghost") {
    return (
      <a
        href={RESUME_URL}
        download="Amit_Virpara_Resume.pdf"
        aria-label="Download resume PDF"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
      >
        <Download className="w-3.5 h-3.5" aria-hidden />
        Resume
      </a>
    );
  }

  return (
    <a
      href={RESUME_URL}
      download="Amit_Virpara_Resume.pdf"
      aria-label="Download resume PDF"
      className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Download className="w-3.5 h-3.5 group-hover:text-primary transition-colors" aria-hidden />
      <span className="font-mono text-xs">Download resume (PDF)</span>
    </a>
  );
};
