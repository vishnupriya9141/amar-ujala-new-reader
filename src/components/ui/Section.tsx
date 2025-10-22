import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const Section = ({
  title,
  icon,
  children,
  className = "bg-card border border-border rounded-lg p-6",
  titleClassName = "text-xl font-bold text-foreground mb-4",
  contentClassName = ""
}: SectionProps) => {
  return (
    <section className={className}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className={titleClassName}>{title}</h2>
        </div>
      )}
      <div className={contentClassName}>
        {children}
      </div>
    </section>
  );
};

export default Section;