
import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                       <Logo />
                    </div>
                    <div className="flex gap-6 items-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} HonestInvoice. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
