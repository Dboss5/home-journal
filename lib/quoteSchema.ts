import { z } from "zod";

export const SERVICE_OPTIONS = [
  "pool",
  "hvac",
  "pest",
  "plumbing",
  "lighting",
  "landscape",
  "hardscape",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20)
    .regex(/^[\d\s()+\-\.]+$/, "Please enter a valid phone number"),
  zip: z
    .string()
    .regex(/^\d{5}$/, "Please enter a 5-digit ZIP code"),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: "Please select a service" }),
  }),
  description: z
    .string()
    .max(2000, "Please keep your message under 2000 characters")
    .optional()
    .or(z.literal("")),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;