import { Reveal } from "./Reveal";

interface Props {
  index: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ index, title, subtitle }: Props) => (
  <div className="mb-16 md:mb-24">
    <Reveal>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs text-primary">{index}</span>
        <span className="h-px flex-1 bg-border max-w-[120px]" />
      </div>
    </Reveal>
    <Reveal delay={0.05}>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
      </Reveal>
    )}
  </div>
);
