import { Playfair_Display, Lora, Cinzel, Atkinson_Hyperlegible } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Used only when the Vision Mode "dyslexia-friendly" toggle is on
export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-accessible",
  display: "swap",
  weight: ["400", "700"],
});