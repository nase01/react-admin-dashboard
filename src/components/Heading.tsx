import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor
}: HeadingProps) => {
  return (
    <>
      <div className="flex items-start gap-x-3">
        <div className={cn("p-2 w-fit rounded-md", bgColor ?? "bg-main/10")}>
          <Icon className={cn("w-9 h-9", iconColor ?? "text-main")} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};