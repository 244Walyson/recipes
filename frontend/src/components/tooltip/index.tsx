import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
  side?: "right" | "top" | "bottom" | "left" | undefined;
}

const index = ({ text, children, side = "top" }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>

        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default index;
