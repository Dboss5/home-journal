"use client";

import * as LottieModule from "lottie-react";

function resolveLottieComponent(mod: any): React.ComponentType<any> {
  if (typeof mod === "function") return mod;
  if (typeof mod?.default === "function") return mod.default;
  if (typeof mod?.default?.default === "function") return mod.default.default;
  if (typeof mod?.Lottie === "function") return mod.Lottie;
  if (typeof mod?.LottiePlayer === "function") return mod.LottiePlayer;

  // Last resort — log what we got so you can see the shape
  console.error("[LottieInner] Unresolved module shape:", mod);
  throw new Error("Could not resolve a Lottie component from lottie-react");
}

const Lottie = resolveLottieComponent(LottieModule);

interface Props {
  animationData: object;
  loop: boolean;
  autoplay: boolean;
}

export default function LottieInner({ animationData, loop, autoplay }: Props) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width: "100%", height: "100%" }}
    />
  );
}