export interface Partner {
  id: "poolburg" | "supremacy" | "external";
  name: string;
  url: string;
  description: string;
  services: string[];
  leadInbox: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "poolburg",
    name: "Poolburg",
    url: "https://poolburg.com",
    description:
      "CPO-certified pool service, repair, and remodeling across the DFW metroplex.",
    services: ["pool"],
    leadInbox: process.env.LEAD_INBOX_POOLBURG ?? "leads@poolburg.com",
  },
  {
    id: "supremacy",
    name: "Supremacy Service",
    url: "https://supremacyservice.com",
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
  },
];

export function getPartnerForService(service: string): Partner | undefined {
  return PARTNERS.find((p) => p.services.includes(service));
}