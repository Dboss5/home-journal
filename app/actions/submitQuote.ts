"use server";

import { Resend } from "resend";
import { getPartnerForService } from "@/lib/partners";
import { quoteSchema, type QuoteInput } from "@/lib/quoteSchema";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function submitQuote(
  input: QuoteInput
): Promise<SubmitResult> {
  // Validate
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid submission",
    };
  }

  const data = parsed.data;

  // Honeypot check
  if (data.website && data.website.length > 0) {
    // Silently succeed for bots
    return { success: true };
  }

  // Route to the right brand
  const partner = getPartnerForService(data.service);
  if (!partner) {
    console.error("[submitQuote] No partner found for service:", data.service);
    return {
      success: false,
      error: "We couldn't route your request. Please try again.",
    };
  }

  // Compose email
  const from = process.env.LEAD_FROM_EMAIL ?? "quotes@homefrontjournal.com";
  const subject = `New ${data.service} quote request — ${data.zip}`;
  const text = `
New quote request from Homefront Journal

Service:     ${data.service}
Name:        ${data.name}
Email:       ${data.email}
Phone:       ${data.phone}
ZIP:         ${data.zip}

Description:
${data.description || "(none provided)"}

—
Submitted via homefrontjournal.com
  `.trim();

  // Send via Resend
  try {
    if (!resend) {
      console.warn(
        "[submitQuote] RESEND_API_KEY not set — logging lead instead:"
      );
      console.log(text);
      return { success: true };
    }

    const { error } = await resend.emails.send({
      from,
      to: partner.leadInbox,
      replyTo: data.email,
      subject,
      text,
    });

    if (error) {
      console.error("[submitQuote] Resend error:", error);
      return {
        success: false,
        error: "We couldn't send your request. Please try again.",
      };
    }

    // Optional: log to Airtable / Sheet here
    // await logToAirtable({ ...data, partner: partner.id });

    return { success: true };
  } catch (err) {
    console.error("[submitQuote] Unexpected error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}