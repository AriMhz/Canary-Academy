import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
  "data-editable-title"?: string
  "data-editable-subtitle"?: string
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  "data-editable-title": dataEditableTitle,
  "data-editable-subtitle": dataEditableSubtitle
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3 text-[#2C4F5E]", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
        <span className="inline-block" data-editable={dataEditableTitle}>
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          <span className="inline-block" data-editable={dataEditableSubtitle}>
            {subtitle}
          </span>
        </p>
      )}
    </div>
  )
}
