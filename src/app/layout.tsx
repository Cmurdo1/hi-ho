import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.honestinvoice.com'),
  title: {
    default: 'HonestInvoice',
    template: `%s | HonestInvoice`,
  },
  description: 'Honest, simple, and powerful invoicing for freelancers and small businesses.',
  openGraph: {
    title: 'HonestInvoice',
    description: 'Honest, simple, and powerful invoicing for freelancers and small businesses.',
    url: 'https://www.honestinvoice.com',
    siteName: 'HonestInvoice',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'HonestInvoice',
    card: 'summary_large_image',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,400&f[]=satoshi@700,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
