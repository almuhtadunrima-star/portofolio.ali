import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://activetheory.net"),
  title: "Active Theory · Creative Digital Experiences",
  description:
    "Founded in 2012. We blend story, art & technology as an in-house team of passionate makers. Our industry-leading web toolset consistently delivers award-winning work through quality & performance.",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
  },
  openGraph: {
    title: "Active Theory · Creative Digital Experiences",
    description:
      "Founded in 2012. We blend story, art & technology as an in-house team of passionate makers. Our industry-leading web toolset consistently delivers award-winning work through quality & performance.",
    url: "https://activetheory.net",
    siteName: "Active Theory",
    images: [
      {
        url: "/images/reel-frame.jpg",
        width: 1200,
        height: 630,
        alt: "Active Theory · Creative Digital Experiences",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Active Theory · Creative Digital Experiences",
    description:
      "Founded in 2012. We blend story, art & technology as an in-house team of passionate makers. Our industry-leading web toolset consistently delivers award-winning work through quality & performance.",
    images: ["/images/reel-frame.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-black">
      <body className="h-full w-full overflow-hidden bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
