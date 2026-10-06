"use client";

import { getPartnerForService, buildPartnerUrl } from "@/lib/partners";
import { ArrowUpRight } from "lucide-react";

interface Props {
  service:
    | "pool"
    | "hvac"
    | "pest"
    | "plumbing"
    | "lighting"
    | "landscape"
    | "hardscape";
  campaign?: string;
  label?: string;
}

export function ProviderLink({ service, campaign, label }: Props) {
  const partner = getPartnerForService(service);
  if (!partner) return null;

  const url = buildPartnerUrl(
    partner,
    service,
    campaign ?? `blog_${service}_inline`
  );
  const text = label ?? partner.name;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      style={{
        color: "var(--red)",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationThickness: "1px",
        fontWeight: 600,
      }}
    >
      {text}
      <ArrowUpRight
        size={13}
        strokeWidth={2}
        style={{ display: "inline", marginLeft: 2, verticalAlign: "-1px" }}
      />
    </a>
  );
}