
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
        <Button asChild variant="ghost" className="md:hidden">
            <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </header>
  );
}
