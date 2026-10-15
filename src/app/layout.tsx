import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bishnu-portfolio.vercel.app"),
  title: "Bishnu Kumar Sardar | Full-Stack Developer & AI Systems Engineer",
  description:
    "Portfolio of Bishnu Kumar Sardar — Full-Stack MERN Developer, AI-Powered Web App Builder, and UI/UX Designer (B.E. ISE, CGPA 8.80). Hackathon winner shipping products across AI, accessibility, agriculture, Web3, and 3D visualization.",
  keywords: [
    "Bishnu Kumar Sardar",
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js Developer",
    "AI Web Apps",
    "React Three Fiber",
    "Three.js",
    "UI/UX Designer",
    "Cambridge Institute of Technology",
    "UnifyTalk",
    "CropIQ",
    "DevMap",
    "TopoForge",
  ],
  authors: [{ name: "Bishnu Kumar Sardar", url: "https://github.com/bishnu24ise-prog" }],
  creator: "Bishnu Kumar Sardar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bishnu-portfolio.vercel.app",
    title: "Bishnu Kumar Sardar | Full-Stack Developer & AI Systems Engineer",
    description:
      "I build AI-powered products that solve real problems, from accessibility to agriculture. Explore 14+ shipped projects, hackathon victories, and 3D graphics.",
    siteName: "Bishnu Kumar Sardar Portfolio",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Bishnu Kumar Sardar Portfolio Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishnu Kumar Sardar | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack MERN, AI-powered applications, and interactive 3D web systems. Hackathon Winner & Scholar.",
    images: ["/images/og-card.png"],
    creator: "@bishnu24ise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Person Schema for rich search indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bishnu Kumar Sardar",
    alternateName: "Bishnu Sardar",
    url: "https://bishnu-portfolio.vercel.app",
    image: "https://bishnu-portfolio.vercel.app/images/profile.jpg",
    jobTitle: "Full-Stack Developer & AI Systems Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Cambridge Institute of Technology, Bangalore",
    },
    sameAs: [
      "https://github.com/bishnu24ise-prog",
      "https://www.linkedin.com/in/bishnu-kumar-sardar-767a57329",
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "MERN Stack",
      "Next.js",
      "Artificial Intelligence",
      "Three.js & 3D Web",
      "UI/UX Design",
      "Accessibility Platforms",
      "Agricultural Tech",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme) {
                  document.documentElement.setAttribute('data-theme', storedTheme);
                } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                  // Keep dark by default for developer futuristic theme unless explicitly set
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#00F5D4] selection:text-[#090B10]">
        {children}
      </body>
    </html>
  );
}
