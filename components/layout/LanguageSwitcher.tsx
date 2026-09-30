"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const switchTo = (next: string) => {
    // @ts-expect-error — next-intl accepts dynamic params object
    router.replace({ pathname, params }, { locale: next });
    setOpen(false);
  };

  return (
    <div className="hf-lang" ref={ref}>
      <button
        aria-label={t("label")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="hf-lang-btn"
      >
        <Globe size={15} strokeWidth={1.8} />
        <span className="hf-lang-code">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul className="hf-lang-menu" role="menu">
          {routing.locales.map((code) => (
            <li key={code} role="none">
              <button
                role="menuitem"
                onClick={() => switchTo(code)}
                className={`hf-lang-item ${code === locale ? "is-active" : ""}`}
              >
                {t(code)}
              </button>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .hf-lang { position: relative; }
        .hf-lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--ink-muted);
          cursor: pointer;
          font-family: var(--font-accent);
          letter-spacing: 0.12em;
          font-size: 0.7rem;
          font-weight: 600;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-lang-btn:hover {
          color: var(--gold);
          border-color: var(--gold);
        }
        .hf-lang-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          list-style: none;
          margin: 0;
          padding: 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          min-width: 150px;
          z-index: 80;
        }
        .hf-lang-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 9px 12px;
          background: transparent;
          border: 0;
          border-radius: var(--radius-sm);
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-lang-item:hover {
          background: var(--surface-alt);
          color: var(--red);
        }
        .hf-lang-item.is-active {
          color: var(--gold);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}