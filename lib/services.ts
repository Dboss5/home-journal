import {
  Waves,
  Wind,
  Bug,
  Wrench,
  Sparkles,
  Trees,
  BrickWall,
  type LucideIcon,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  key: string;
  features: string[];
  vetting: string[];
  costs: { range: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "pool",
    key: "pool",
    features: [
      "Weekly chemical balancing and testing",
      "Full cleaning — skimmer, brush, vacuum",
      "Filter and pump inspection",
      "Equipment repair and replacement",
      "Seasonal opening and closing",
    ],
    vetting: [
      "Licensed pool operator or CPO certification",
      "Fully insured with general liability",
      "Local references — at least three",
      "Transparent pricing, no surprise fees",
    ],
    costs: [
      { label: "Weekly service (avg)", range: "$120 – $200 / mo" },
      { label: "One-time deep clean", range: "$250 – $450" },
      { label: "Equipment repair", range: "$150 – $800" },
    ],
    faqs: [
      {
        q: "How often should my pool be serviced?",
        a: "Weekly during swim season, bi-weekly in off-months. In warmer climates, weekly year-round.",
      },
      {
        q: "Can I service my own pool?",
        a: "You can, but chemical balance gets tricky fast. One bad week can mean algae, cloudy water, or equipment damage.",
      },
      {
        q: "Do I need to be home during service?",
        a: "No. Most pros work around your schedule and send a report after each visit.",
      },
    ],
  },
  {
    slug: "hvac",
    key: "hvac",
    features: [
      "Seasonal tune-ups — spring AC, fall furnace",
      "Filter replacement and airflow checks",
      "Refrigerant level testing",
      "Duct cleaning and sealing",
      "Emergency repair, 24/7",
    ],
    vetting: [
      "NATE-certified technician",
      "EPA 608 certification",
      "Licensed HVAC contractor in your state",
      "Written estimate before work begins",
    ],
    costs: [
      { label: "Annual tune-up", range: "$90 – $200" },
      { label: "Filter replacement", range: "$20 – $80" },
      { label: "Full system replacement", range: "$5,000 – $12,000" },
    ],
    faqs: [
      {
        q: "How often should I service my HVAC?",
        a: "Twice a year — once in spring for cooling, once in fall for heating.",
      },
      {
        q: "What's the lifespan of a typical HVAC system?",
        a: "15–20 years with regular maintenance. Skipping tune-ups can cut that in half.",
      },
      {
        q: "Should I repair or replace?",
        a: "Rule of thumb: if the repair costs more than 30% of a new unit and the system is over 12 years old, replace.",
      },
    ],
  },
  {
    slug: "pest-control",
    key: "pest",
    features: [
      "Quarterly perimeter treatment",
      "Rodent exclusion and trapping",
      "Termite inspection and bonding",
      "Wasp, bee, and hornet removal",
      "Wildlife removal and relocation",
    ],
    vetting: [
      "State-licensed pest control operator",
      "Integrated Pest Management (IPM) approach",
      "Pet- and child-safe treatment options",
      "Follow-up visits included in pricing",
    ],
    costs: [
      { label: "Quarterly treatment", range: "$80 – $150 / visit" },
      { label: "One-time treatment", range: "$150 – $400" },
      { label: "Termite bond (annual)", range: "$300 – $800" },
    ],
    faqs: [
      {
        q: "Is pest control safe for pets and kids?",
        a: "Yes, when applied correctly. Ask your pro for pet-safe and child-safe options — most offer them.",
      },
      {
        q: "How often do I need treatment?",
        a: "Quarterly is standard for prevention. Active infestations may need monthly until controlled.",
      },
      {
        q: "Do I need to leave my home during treatment?",
        a: "For most perimeter treatments, no. For fogging or interior treatments, usually 2–4 hours.",
      },
    ],
  },
  {
    slug: "plumbing",
    key: "plumbing",
    features: [
      "Leak detection and repair",
      "Water heater service and replacement",
      "Drain cleaning and rooter service",
      "Fixture installation",
      "Repiping and slab leak repair",
    ],
    vetting: [
      "State-licensed plumber",
      "Bonded and insured",
      "Upfront flat-rate pricing available",
      "Warranty on parts and labor",
    ],
    costs: [
      { label: "Standard service call", range: "$75 – $150" },
      { label: "Water heater replacement", range: "$800 – $2,500" },
      { label: "Drain cleaning", range: "$150 – $400" },
    ],
    faqs: [
      {
        q: "How do I know if I have a slab leak?",
        a: "Unexplained high water bills, warm spots on the floor, or the sound of running water when nothing is on.",
      },
      {
        q: "How long does a water heater last?",
        a: "Tank: 8–12 years. Tankless: 20+ years with annual descaling.",
      },
      {
        q: "Do I need a permit for plumbing work?",
        a: "For major work like repiping or water heater replacement — yes. Your plumber should handle it.",
      },
    ],
  },
  {
    slug: "holiday-lighting",
    key: "lighting",
    features: [
      "Custom design consultation",
      "Professional installation",
      "Maintenance throughout the season",
      "Post-season takedown and storage",
      "Commercial and residential",
    ],
    vetting: [
      "Licensed and insured installer",
      "Commercial-grade, weather-rated lights",
      "Written design proposal before install",
      "Takedown scheduled in advance",
    ],
    costs: [
      { label: "Single-story home", range: "$300 – $800" },
      { label: "Two-story home", range: "$800 – $2,000" },
      { label: "Commercial property", range: "$2,000+" },
    ],
    faqs: [
      {
        q: "When should I book holiday lighting?",
        a: "October — early November. The best installers book out by Halloween.",
      },
      {
        q: "Do I own the lights afterward?",
        a: "Depends on the package. Some rentals include storage and reuse; others let you keep them.",
      },
      {
        q: "Can you match my existing decorations?",
        a: "Yes. Most pros will work with what you have or design a fresh scheme.",
      },
    ],
  },
  {
    slug: "landscape",
    key: "landscape",
    features: [
      "Lawn care and fertilization",
      "Tree and shrub trimming",
      "Mulching and bed maintenance",
      "Irrigation system service",
      "Seasonal cleanups",
    ],
    vetting: [
      "Licensed landscape contractor",
      "Certified pesticide applicator (if needed)",
      "Local plant knowledge",
      "Year-round service availability",
    ],
    costs: [
      { label: "Bi-weekly mowing", range: "$40 – $80 / visit" },
      { label: "Spring cleanup", range: "$250 – $600" },
      { label: "Tree trimming", range: "$300 – $1,500" },
    ],
    faqs: [
      {
        q: "How often should I fertilize my lawn?",
        a: "3–4 times a year, timed to the growing season in your region.",
      },
      {
        q: "When should I prune my trees?",
        a: "Late winter for most. Flowering trees get pruned right after they bloom.",
      },
      {
        q: "Should I aerate my lawn?",
        a: "Once a year in fall if you have clay soil or heavy foot traffic.",
      },
    ],
  },
  {
    slug: "hardscape",
    key: "hardscape",
    features: [
      "Paver patios and walkways",
      "Retaining walls",
      "Driveway installation",
      "Outdoor kitchens and fire pits",
      "Drainage and grading",
    ],
    vetting: [
      "Licensed hardscape contractor",
      "Portfolio of similar projects",
      "Written scope and timeline",
      "Warranty on installation",
    ],
    costs: [
      { label: "Paver patio (per sq ft)", range: "$15 – $35" },
      { label: "Retaining wall (per sq ft)", range: "$25 – $60" },
      { label: "Driveway (per sq ft)", range: "$8 – $20" },
    ],
    faqs: [
      {
        q: "How long does a hardscape project take?",
        a: "Small patios: 3–5 days. Larger projects with walls and drainage: 2–4 weeks.",
      },
      {
        q: "Do I need a permit for a retaining wall?",
        a: "Usually yes for walls over 3–4 feet. Your contractor should pull the permit.",
      },
      {
        q: "What's the best time of year for hardscaping?",
        a: "Spring and fall. Avoid deep winter for paver work due to ground conditions.",
      },
    ],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getOtherServices(currentSlug: string): ServiceData[] {
  return SERVICES.filter((s) => s.slug !== currentSlug);
}