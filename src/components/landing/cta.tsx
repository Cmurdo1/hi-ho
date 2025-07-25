
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground font-headline">Ready to streamline your invoicing?</h2>
        <p className="text-lg text-primary-foreground/90 mt-2 mb-6">Join thousands of businesses that trust HonestInvoice for their billing needs.</p>
        <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </div>
    </div>
  );
}
