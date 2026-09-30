"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { useEffect, useState } from "react";

interface LottiePlayerProps {
  /** Base name — loads {name}-light.lottie or {name}-dark.lottie */
  name: "hvac" | "pool" | "plumbing";
  className?: string;
  ariaLabel?: string;
  forceTheme?: "light" | "dark";
  loop?: boolean;
}

export function LottiePlayer({
  name,
  className,
  ariaLabel,
  forceTheme,
  loop = true,
}: LottiePlayerProps) {
  const { prefs } = usePreferences();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (forceTheme) {
      setTheme(forceTheme);
      return;
    }
    const resolve = () => {
      if (prefs.theme === "system") {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(isDark ? "dark" : "light");
      } else {
        setTheme(prefs.theme as "light" | "dark");
      }
    };
    resolve();

    if (prefs.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", resolve);
      return () => mq.removeEventListener("change", resolve);
    }
  }, [prefs.theme, forceTheme]);

  const src = `/lottie/${name}-${theme}.lottie`;

  // Calm Mode pauses playback — respects sensory sensitivity
  const shouldPlay = !prefs.calm;

  if (!mounted) {
    return <div className={className} aria-hidden />;
  }

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel || `${name} animation`}
    >
      <DotLottieReact
        src={src}
        loop={loop && shouldPlay}
        autoplay={shouldPlay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}