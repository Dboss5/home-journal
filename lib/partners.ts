export interface Partner {
  id: "poolburg" | "supremacy";
  name: string;
  url: string;
  /** Deep link to a specific service page — used for outbound referral CTAs */
  serviceLinks: Record<string, string>;
  description: string;
  services: string[];
  leadInbox: string;
  shortBlurb: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "poolburg",
    name: "Poolburg",
    url: "https://poolburg.com",
    serviceLinks: {
      pool: "https://poolburg.com/services/",
    },
    description:
      "CPO-certified pool service, repair, and remodeling across the DFW metroplex.",
    services: ["pool"],
    leadInbox: process.env.LEAD_INBOX_POOLBURG ?? "leads@poolburg.com",
    shortBlurb:
      "CPO-certified pool technicians serving Dallas, Plano, Frisco, McKinney, and the wider DFW metroplex.",
  },
  {
    id: "supremacy",
    name: "Supremacy Service",
    url: "https://supremacyservice.com",
    serviceLinks: {
      hvac: "https://supremacyservice.com/hvac-repair-in-dallas-texas/",
      pest: "https://supremacyservice.com/pest-control/",
      plumbing: "https://supremacyservice.com/plumbing-repair/",
      lighting: "https://supremacyservice.com/christmas-light-installation/",
      landscape:
        "https://supremacyservice.com/landscape-and-outdoor-accents-dfw/",
      hardscape:
        "https://supremacyservice.com/landscape-and-outdoor-accents-dfw/",
    },
    description:
      "Full-service plumbing, HVAC, pest control, electrical, lighting, landscape, and hardscape across DFW.",
    services: [
      "hvac",
      "pest",
      "plumbing",
      "lighting",
      "landscape",
      "hardscape",
    ],
    leadInbox: process.env.LEAD_INBOX_SUPREMACY ?? "leads@supremacyservice.com",
    shortBlurb:
      "Licensed, insured specialists serving Dallas, Plano, Frisco, Fort Worth, and surrounding areas.",
  },
];

export function getPartnerForService(service: string): Partner | undefined {
  return PARTNERS.find((p) => p.services.includes(service));
}

/**
 * Returns the deep service-page URL for the given service, with UTM params.
 * Falls back to the partner homepage if the service key isn't mapped.
 */
export function buildPartnerUrl(
  partner: Partner,
  service: string,
  campaign: string
): string {
  const target = partner.serviceLinks[service] ?? partner.url;
  const params = new URLSearchParams({
    utm_source: "homefront",
    utm_medium: "referral",
    utm_campaign: campaign,
  });
  const separator = target.includes("?") ? "&" : "?";
  return `${target}${separator}${params.toString()}`;
}