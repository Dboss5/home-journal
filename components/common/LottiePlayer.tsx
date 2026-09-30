"use client";

import dynamic from "next/dynamic";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { useEffect, useState } from "react";

const LottieInner = dynamic(() => import("./LottieInner"), { ssr: false });

type AnimationName = "hvac" | "pool" | "landscape";

interface LottiePlayerProps {
  name: AnimationName;
  className?: string;
  ariaLabel?: string;
  forceTheme?: "light" | "dark";
  loop?: boolean;
}

const animationCache: Record<string, any> = {};

export function LottiePlayer({
  name,
  className,
  ariaLabel,
  forceTheme,
  loop = true,
}: LottiePlayerProps) {
  const { prefs } = usePreferences();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [animationData, setAnimationData] = useState<any>(null);
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

  useEffect(() => {
    if (!mounted) return;
    const key = `${name}-${theme}`;

    if (animationCache[key]) {
      setAnimationData(animationCache[key]);
      return;
    }

    let cancelled = false;
    fetch(`/lottie/${key}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${key}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        animationCache[key] = data;
        setAnimationData(data);
      })
      .catch((err) => {
        console.warn(`[LottiePlayer] ${err.message}`);
        if (!cancelled) setAnimationData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [name, theme, mounted]);

  const shouldPlay = !prefs.calm;

  if (!mounted || !animationData) {
    return <div className={className} aria-hidden />;
  }

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel || `${name} animation`}
    >
      <LottieInner
        animationData={animationData}
        loop={loop && shouldPlay}
        autoplay={shouldPlay}
      />
    </div>
  );
}