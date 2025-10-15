  "use client";

  import * as React from "react";

  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";

  type MemberBubbleProps = {
    name: string;
    selected?: boolean;
    onToggle?: (selected: boolean) => void;
  } & Omit<React.ComponentProps<typeof Button>,
  "children">;

  const MemberBubble = React.forwardRef<HTMLButtonElement,
  MemberBubbleProps>(
    ({ name, selected, onToggle, className,
  onClick, ...props }, ref) => {
      const isControlled = selected !== undefined;
      const [internalSelected, setInternalSelected] =
  React.useState(false);
      const isSelected = isControlled ? selected :
  internalSelected;

      const handleClick = React.useCallback<
        NonNullable<React.ComponentProps<typeof
  Button>["onClick"]>
      >(
        (event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;

          const next = !isSelected;
          if (!isControlled)
  setInternalSelected(next);
          onToggle?.(next);
        },
        [isControlled, isSelected, onClick, onToggle]
      );

      return (
        <Button
          ref={ref}
          type="button"
          variant="outline"
          aria-pressed={isSelected}
          data-selected={isSelected}
          className={cn( "rounded-full px-4 py-1 text-sm font- medium transition-colors", "border-primary text-foreground bg- background hover:bg-primary/10", "data-[selected=true]:border- primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:hover:bg-primary/90", className
          )}
          onClick={handleClick}
          {...props}
        >
          {name}
        </Button>
      );
    }
  );

  MemberBubble.displayName = "MemberBubble";

  export { MemberBubble };
