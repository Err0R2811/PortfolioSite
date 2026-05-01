import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const RESUME_URL = "/files/Amit_Virpara_Resume.pdf";

export const ResumeButton = ({ variant = "default" }: { variant?: "default" | "ghost" }) => {
  const [size, setSize] = useState<string | null>(null);
  const [updated, setUpdated] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(RESUME_URL, { method: "HEAD" })
      .then((res) => {
        if (!active || !res.ok) return;
        const len = res.headers.get("content-length");
        const lm = res.headers.get("last-modified");
        if (len) {
          const kb = Math.round(parseInt(len, 10) / 1024);
          setSize(`${kb} KB`);
        }
        if (lm) {
          const d = new Date(lm);
          setUpdated(
            d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
          );
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (variant === "ghost") {
    return (
      <a
        href={RESUME_URL}
        download="Amit_Virpara_Resume.pdf"
        aria-label={`Download resume PDF${size ? `, ${size}` : ""}${updated ? `, updated ${updated}` : ""}`}
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
      >
        <Download className="w-3.5 h-3.5" aria-hidden />
        Resume
        {size && <span className="text-muted-foreground/60">· {size}</span>}
      </a>
    );
  }

  return (
    <a
      href={RESUME_URL}
      download="Amit_Virpara_Resume.pdf"
      aria-label={`Download resume PDF${size ? `, ${size}` : ""}${updated ? `, updated ${updated}` : ""}`}
      className="group inline-flex flex-col gap-1 px-5 py-3 rounded-full border border-border hover:border-primary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs">
        <Download className="w-3.5 h-3.5 group-hover:text-primary transition-colors" aria-hidden />
        Download resume (PDF)
      </span>
      {(size || updated) && (
        <span className="font-mono text-[10px] text-muted-foreground/70 pl-5">
          {size}
          {size && updated && " · updated "}
          {updated}
        </span>
      )}
    </a>
  );
};
