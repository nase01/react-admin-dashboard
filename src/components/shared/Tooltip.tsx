import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ message, children, position = "top" }: TooltipProps) {
  let positionClasses = "";
  let arrowClasses = "";

  switch (position) {
    case "top":
      positionClasses = "bottom-full left-1/2 -translate-x-1/2 mb-[9px]";
      arrowClasses = "top-full left-1/2 -translate-x-1/2 border-t-indigo-50 dark:border-t-slate-900";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 -translate-x-1/2 mt-[9px]";
      arrowClasses = "bottom-full left-1/2 -translate-x-1/2 border-b-indigo-50 dark:border-b-slate-900";
      break;
    case "left":
      positionClasses = "right-full top-1/2 -translate-y-1/2 mr-[9px]";
      arrowClasses = "left-full top-1/2 -translate-y-1/2 border-l-indigo-50 dark:border-l-slate-900";
      break;
    case "right":
      positionClasses = "left-full top-1/2 -translate-y-1/2 ml-[9px]"; 
      arrowClasses = "right-full top-1/2 -translate-y-1/2 border-r-indigo-50 dark:border-r-slate-900";
      break;
    default:
      break;
  }

  return (
    <div className="group relative flex">
      {children}
      <span
        className={`absolute scale-0 transition-all rounded-md py-1 px-2 bg-indigo-50 dark:bg-slate-900 text-indigo-800 dark:text-white z-50 text-xs group-hover:scale-100 whitespace-nowrap ${positionClasses}`}
      >
        {message}
        <span className={`absolute w-0 h-0 border-8 border-transparent ${arrowClasses}`} ></span>
      </span>
    </div>
  );
}
