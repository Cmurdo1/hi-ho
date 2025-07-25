
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="40" height="40" rx="8" fill="hsl(var(--primary))" fillOpacity="0.1" />
            <path
            d="M14.0099 26V14H16.2899V18.17H22.7099V14H24.9899V26H22.7099V21.6H16.2899V26H14.0099Z"
            fill="hsl(var(--primary))"
            />
            <path d="M28 26V14H30.28V26H28Z" fill="hsl(var(--primary))" />
        </svg>

      {!iconOnly && (
        <span className="text-2xl font-headline font-bold text-foreground">
          HonestInvoice
        </span>
      )}
    </div>
  );
}
