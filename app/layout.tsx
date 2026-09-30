import type { Metadata } from "next";
import { playfair, lora, cinzel, atkinson } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Homefront Journal",
    template: "%s | Homefront Journal",
  },
  description:
    "The trusted guide to every corner of your home. Pool, HVAC, pest, plumbing, lighting, landscape, and hardscape expertise — plus a hand-picked network of local pros.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const script = `
    (function(){
      try {
        var m = document.cookie.match(/hf_prefs=([^;]+)/);
        var p = m ? JSON.parse(decodeURIComponent(m[1])) : {};
        var t = p.theme || 'system';
        var resolved = t === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : t;
        var r = document.documentElement;
        r.setAttribute('data-theme', resolved);
        r.setAttribute('data-focus', String(!!p.focus));
        r.setAttribute('data-calm', String(!!p.calm));
        r.setAttribute('data-vision', String(!!p.vision));
        r.setAttribute('data-dyslexic', String(!!p.dyslexic));
        r.setAttribute('data-fontsize', p.fontSize || 'md');
        r.style.colorScheme = resolved;
      } catch(e){}
    })();
  `;

  return (
    <html
      suppressHydrationWarning
      className={`${playfair.variable} ${lora.variable} ${cinzel.variable} ${atkinson.variable}`}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: script }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}