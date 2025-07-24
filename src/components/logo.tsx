import { FileStack } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <FileStack className="h-6 w-6" />
      </div>
      {!iconOnly && (
        <span className="text-2xl font-headline font-bold text-primary">
          HonestInvoice
        </span>
      )}
    </div>
  );
}
