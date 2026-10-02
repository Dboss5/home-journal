"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  quoteSchema,
  SERVICE_OPTIONS,
  type QuoteInput,
  type ServiceOption,
} from "@/lib/quoteSchema";
import { submitQuote } from "@/app/actions/submitQuote";

const STYLES = `
.hf-quote {
  padding-bottom: 0;
}
.hf-quote-hero {
  position: relative;
  margin: 0 -24px;
  padding: 80px 24px 60px;
  background:
    radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%),
    var(--bg);
  border-bottom: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  text-align: center;
}
.hf-quote-hero-inner {
  max-width: 700px;
  margin: 0 auto;
}
.hf-quote-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 14px 0 18px;
}
.hf-quote-hero-sub {
  color: var(--ink-muted);
  font-size: 1.08rem;
  line-height: 1.6;
  max-width: 56ch;
  margin: 0 auto;
}
.hf-quote-body {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 0;
}
.hf-quote-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.hf-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hf-field label {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--ink);
}
.hf-field input,
.hf-field select,
.hf-field textarea {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--ink);
  transition: all var(--motion-duration) var(--motion-ease);
  width: 100%;
}
.hf-field input:focus,
.hf-field select:focus,
.hf-field textarea:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--gold) 25%, transparent);
}
.hf-field textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}
.hf-field-error {
  font-size: 0.82rem;
  color: var(--red);
  margin: 0;
}
.hf-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
.hf-honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.hf-quote-submit {
  margin-top: 8px;
  padding: 16px 24px;
  font-size: 0.8rem;
  width: 100%;
  justify-content: center;
}
.hf-quote-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.hf-quote-note {
  font-size: 0.85rem;
  color: var(--ink-muted);
  text-align: center;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.hf-quote-spin {
  animation: hf-spin 1s linear infinite;
}
@keyframes hf-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.hf-quote-success {
  max-width: 640px;
  margin: 0 auto;
  padding: 64px 0;
  text-align: center;
}
.hf-quote-success-icon {
  color: var(--gold);
  margin-bottom: 24px;
}
.hf-quote-success-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  margin: 0 0 16px;
}
.hf-quote-success-body {
  color: var(--ink-muted);
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0 0 32px;
}
.hf-quote-error-banner {
  padding: 16px 20px;
  background: color-mix(in oklab, var(--red) 10%, transparent);
  border: 1px solid var(--red);
  border-radius: var(--radius-md);
  color: var(--red);
  font-size: 0.95rem;
  line-height: 1.5;
}
@media (max-width: 640px) {
  .hf-field-row {
    grid-template-columns: 1fr;
  }
}
`;

export function QuoteContent() {
  const t = useTranslations("quote");
  const tSvc = useTranslations("services");
  const searchParams = useSearchParams();
  const preService = searchParams.get("service") as ServiceOption | null;

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validPreService =
    preService && (SERVICE_OPTIONS as readonly string[]).includes(preService)
      ? preService
      : "pool";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      service: validPreService,
    },
  });

  const onSubmit = async (data: QuoteInput) => {
    setServerError(null);
    const result = await submitQuote(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error ?? t("errorGeneric"));
    }
  };

  if (submitted) {
    return (
      <div className="hf-quote">
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <section className="hf-quote-success">
          <CheckCircle2
            size={56}
            strokeWidth={1.4}
            className="hf-quote-success-icon"
          />
          <h1 className="hf-quote-success-title">{t("successTitle")}</h1>
          <p className="hf-quote-success-body">{t("successBody")}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="hf-quote">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section className="hf-quote-hero">
        <div className="hf-quote-hero-inner">
          <p className="accent-label">{t("eyebrow")}</p>
          <h1 className="hf-quote-hero-title">{t("title")}</h1>
          <p className="hf-quote-hero-sub">{t("subtitle")}</p>
        </div>
      </section>

      <section className="hf-quote-body">
        <form
          className="hf-quote-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {serverError && (
            <div className="hf-quote-error-banner">{serverError}</div>
          )}

          <div className="hf-field-row">
            <div className="hf-field">
              <label htmlFor="name">{t("nameLabel")}</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={t("namePlaceholder")}
                {...register("name")}
              />
              {errors.name && (
                <p className="hf-field-error">{errors.name.message}</p>
              )}
            </div>

            <div className="hf-field">
              <label htmlFor="phone">{t("phoneLabel")}</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder={t("phonePlaceholder")}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="hf-field-error">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="hf-field-row">
            <div className="hf-field">
              <label htmlFor="email">{t("emailLabel")}</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                {...register("email")}
              />
              {errors.email && (
                <p className="hf-field-error">{errors.email.message}</p>
              )}
            </div>

            <div className="hf-field">
              <label htmlFor="zip">{t("zipLabel")}</label>
              <input
                id="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="75001"
                maxLength={5}
                {...register("zip")}
              />
              {errors.zip && (
                <p className="hf-field-error">{errors.zip.message}</p>
              )}
            </div>
          </div>

          <div className="hf-field">
            <label htmlFor="service">{t("serviceLabel")}</label>
            <select id="service" {...register("service")}>
              {SERVICE_OPTIONS.map((svc) => (
                <option key={svc} value={svc}>
                  {tSvc(svc)}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="hf-field-error">{errors.service.message}</p>
            )}
          </div>

          <div className="hf-field">
            <label htmlFor="description">{t("descriptionLabel")}</label>
            <textarea
              id="description"
              placeholder={t("descriptionPlaceholder")}
              {...register("description")}
            />
          </div>

          {/* Honeypot — hidden from humans, catches bots */}
          <div className="hf-honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary hf-quote-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={16}
                  strokeWidth={2}
                  className="hf-quote-spin"
                />
                {t("submitting")}
              </>
            ) : (
              <>
                {t("submit")}
                <ArrowRight size={16} strokeWidth={2} />
              </>
            )}
          </button>

          <p className="hf-quote-note">
            <ShieldCheck size={14} strokeWidth={1.8} />
            {t("privacy")}
          </p>
        </form>
      </section>
    </div>
  );
}