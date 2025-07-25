
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline">
          Professional Invoice <br />
          <span className="text-primary">Generator</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Create, send, and track professional invoices with ease. Streamline your billing process and get paid faster.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/signup">Join Now</Link>
        </Button>
        <div className="mt-12 relative">
            <Image
                src="https://placehold.co/1200x600.png"
                width={1200}
                height={600}
                alt="HonestInvoice app screenshot"
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="invoice dashboard"
            />
        </div>
      </div>
    </section>
  );
}
