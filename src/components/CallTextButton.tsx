import { ReactNode } from "react";
import { Phone, MessageSquareText } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PHONE_NUMBER = "6153151541";
export const PHONE_DISPLAY = "615-315-1541";

const MenuItems = ({ onAction }: { onAction?: () => void }) => (
  <DropdownMenuContent align="center" className="z-[70] min-w-[220px]">
    <DropdownMenuItem asChild>
      <a href={`tel:${PHONE_NUMBER}`} onClick={onAction} className="gap-2 cursor-pointer font-semibold">
        <Phone size={16} className="text-primary" /> Call {PHONE_DISPLAY}
      </a>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <a href={`sms:${PHONE_NUMBER}`} onClick={onAction} className="gap-2 cursor-pointer font-semibold">
        <MessageSquareText size={16} className="text-primary" /> Text {PHONE_DISPLAY}
      </a>
    </DropdownMenuItem>
  </DropdownMenuContent>
);

interface CallTextButtonProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  withIcon?: boolean;
  label?: string;
  /** Called when either menu option is chosen (e.g. to close a mobile menu). */
  onAction?: () => void;
}

/** CTA button that lets the visitor choose between calling and texting. */
const CallTextButton = ({
  variant = "hero",
  size = "xl",
  className,
  withIcon = false,
  label = `Call or Text ${PHONE_DISPLAY}`,
  onAction,
}: CallTextButtonProps) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <Button variant={variant} size={size} className={className}>
        {withIcon && <Phone size={18} />} {label}
      </Button>
    </DropdownMenuTrigger>
    <MenuItems onAction={onAction} />
  </DropdownMenu>
);

/** Inline-link version of the same call/text chooser. */
export const CallTextLink = ({ className, children }: { className?: string; children: ReactNode }) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <button type="button" className={className}>
        {children}
      </button>
    </DropdownMenuTrigger>
    <MenuItems />
  </DropdownMenu>
);

export default CallTextButton;
