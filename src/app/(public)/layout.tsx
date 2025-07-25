import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <CTA />
            <Footer />
        </div>
    )
}
