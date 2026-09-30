"use client";

import { useEffect, useRef, useState } from "react";
import { usePreferences } from "@/components/providers/PreferencesProvider";
import { useTranslations } from "next-intl";
import {
  Sun,
  Moon,
  Monitor,
  Eye,
  Brain,
  Feather,
  Type,
  RotateCcw,
  X,
  Settings2,
} from "lucide-react";
import type { FontSize, Theme } from "@/lib/preferences";

export function PreferencesPanel() {
  const t = useTranslations("preferences");
  const [open, setOpen] = useState(false);
  const { prefs, setPref, reset } = usePreferences();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-label={t("trigger")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="hf-pref-trigger"
      >
        <Settings2 size={20} strokeWidth={1.6} />
      </button>

      <div
        ref={panelRef}
        role="dialog"
        aria-label={t("title")}
        aria-hidden={!open}
        className={`hf-pref-panel ${open ? "is-open" : ""}`}
      >
        <header className="hf-pref-header">
          <div>
            <p className="accent-label">{t("title")}</p>
            <h3 className="hf-pref-title">{t("subtitle")}</h3>
          </div>
          <button
            aria-label={t("close")}
            onClick={() => setOpen(false)}
            className="hf-pref-close"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </header>

        <hr className="hairline" />

        <section className="hf-pref-section">
          <p className="accent-label">{t("theme")}</p>
          <div className="hf-pref-row">
            <ThemeButton
              icon={<Sun size={16} strokeWidth={1.8} />}
              label={t("light")}
              active={prefs.theme === "light"}
              onClick={() => setPref("theme", "light" as Theme)}
            />
            <ThemeButton
              icon={<Moon size={16} strokeWidth={1.8} />}
              label={t("dark")}
              active={prefs.theme === "dark"}
              onClick={() => setPref("theme", "dark" as Theme)}
            />
            <ThemeButton
              icon={<Monitor size={16} strokeWidth={1.8} />}
              label={t("system")}
              active={prefs.theme === "system"}
              onClick={() => setPref("theme", "system" as Theme)}
            />
          </div>
        </section>

        <section className="hf-pref-section">
          <ToggleRow
            icon={<Brain size={16} strokeWidth={1.8} />}
            title={t("focus")}
            description={t("focusDesc")}
            active={prefs.focus}
            onToggle={() => setPref("focus", !prefs.focus)}
          />
        </section>

        <section className="hf-pref-section">
          <ToggleRow
            icon={<Feather size={16} strokeWidth={1.8} />}
            title={t("calm")}
            description={t("calmDesc")}
            active={prefs.calm}
            onToggle={() => setPref("calm", !prefs.calm)}
          />
        </section>

        <section className="hf-pref-section">
          <ToggleRow
            icon={<Eye size={16} strokeWidth={1.8} />}
            title={t("vision")}
            description={t("visionDesc")}
            active={prefs.vision}
            onToggle={() => setPref("vision", !prefs.vision)}
          />
          {prefs.vision && (
            <label className="hf-pref-subcheck">
              <input
                type="checkbox"
                checked={prefs.dyslexic}
                onChange={(e) => setPref("dyslexic", e.target.checked)}
              />
              <span>{t("dyslexic")}</span>
            </label>
          )}
        </section>

        <section className="hf-pref-section">
          <p className="accent-label">
            <Type
              size={14}
              strokeWidth={1.8}
              style={{
                display: "inline",
                marginRight: 6,
                verticalAlign: "-2px",
              }}
            />
            {t("textSize")}
          </p>
          <div className="hf-pref-row">
            {(["sm", "md", "lg", "xl"] as FontSize[]).map((size) => (
              <button
                key={size}
                aria-pressed={prefs.fontSize === size}
                onClick={() => setPref("fontSize", size)}
                className={`hf-pref-chip ${
                  prefs.fontSize === size ? "is-active" : ""
                }`}
              >
                A
              </button>
            ))}
          </div>
        </section>

        <hr className="hairline" />

        <button onClick={reset} className="hf-pref-reset">
          <RotateCcw size={14} strokeWidth={1.8} />
          {t("reset")}
        </button>
      </div>

      <style jsx>{`
        .hf-pref-trigger {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 80;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--surface);
          color: var(--gold);
          border: 1px solid color-mix(in oklab, var(--gold) 45%, transparent);
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-pref-trigger:hover {
          color: var(--red);
          border-color: var(--red);
          transform: translateY(-2px);
        }
        .hf-pref-trigger:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }
        .hf-pref-panel {
          position: fixed;
          bottom: 84px;
          right: 24px;
          z-index: 90;
          width: min(380px, calc(100vw - 32px));
          max-height: calc(100dvh - 120px);
          overflow-y: auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 22px;
          opacity: 0;
          transform: translateY(12px) scale(0.98);
          pointer-events: none;
          transition:
            opacity var(--motion-duration) var(--motion-ease),
            transform var(--motion-duration) var(--motion-ease);
        }
        .hf-pref-panel.is-open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .hf-pref-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .hf-pref-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          margin: 2px 0 0;
          color: var(--ink);
        }
        .hf-pref-close {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--ink-muted);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-pref-close:hover {
          color: var(--red);
          border-color: var(--red);
        }
        .hf-pref-section {
          padding: 16px 0;
        }
        .hf-pref-row {
          display: flex;
          gap: 8px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .hf-pref-subcheck {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
          padding: 10px 12px;
          background: var(--surface-alt);
          border-radius: var(--radius-sm);
          font-size: 0.86rem;
          color: var(--ink-muted);
          cursor: pointer;
        }
        .hf-pref-subcheck input {
          accent-color: var(--red);
        }
        .hf-pref-chip {
          flex: 1;
          min-width: 44px;
          padding: 10px 0;
          background: var(--surface-alt);
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--ink-muted);
          font-family: var(--font-display);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-pref-chip:nth-child(1) { font-size: 0.85rem; }
        .hf-pref-chip:nth-child(2) { font-size: 1rem; }
        .hf-pref-chip:nth-child(3) { font-size: 1.15rem; }
        .hf-pref-chip:nth-child(4) { font-size: 1.3rem; }
        .hf-pref-chip:hover { color: var(--ink); }
        .hf-pref-chip.is-active {
          background: var(--red);
          color: #fff;
          border-color: var(--gold);
        }
        .hf-pref-reset {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--ink-muted);
          font-family: var(--font-accent);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-pref-reset:hover {
          color: var(--red);
          border-color: var(--red);
        }
      `}</style>
    </>
  );
}

function ThemeButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      onClick={onClick}
      className={`hf-theme-btn ${active ? "is-active" : ""}`}
    >
      {icon}
      <span>{label}</span>
      <style jsx>{`
        .hf-theme-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 12px 8px;
          background: var(--surface-alt);
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--ink-muted);
          font-size: 0.75rem;
          font-family: var(--font-accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-theme-btn:hover {
          color: var(--ink);
        }
        .hf-theme-btn.is-active {
          background: var(--red);
          color: #fff;
          border-color: var(--gold);
        }
      `}</style>
    </button>
  );
}

function ToggleRow({
  icon,
  title,
  description,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className={`hf-toggle-row ${active ? "is-active" : ""}`}
    >
      <span className="hf-toggle-icon">{icon}</span>
      <span className="hf-toggle-text">
        <span className="hf-toggle-title">{title}</span>
        <span className="hf-toggle-desc">{description}</span>
      </span>
      <span className="hf-toggle-track">
        <span className="hf-toggle-thumb" />
      </span>
      <style jsx>{`
        .hf-toggle-row {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          gap: 12px;
          align-items: center;
          width: 100%;
          padding: 12px;
          background: var(--surface-alt);
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          cursor: pointer;
          text-align: left;
          transition: all var(--motion-duration) var(--motion-ease);
        }
        .hf-toggle-row:hover {
          border-color: color-mix(in oklab, var(--gold) 40%, transparent);
        }
        .hf-toggle-row.is-active {
          border-color: var(--gold);
        }
        .hf-toggle-icon {
          color: var(--gold);
          display: grid;
          place-items: center;
        }
        .hf-toggle-row.is-active .hf-toggle-icon {
          color: var(--red);
        }
        .hf-toggle-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hf-toggle-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--ink);
        }
        .hf-toggle-desc {
          font-size: 0.78rem;
          color: var(--ink-muted);
          line-height: 1.4;
        }
        .hf-toggle-track {
          width: 38px;
          height: 22px;
          border-radius: 999px;
          background: var(--border);
          position: relative;
          transition: background var(--motion-duration) var(--motion-ease);
          flex-shrink: 0;
        }
        .hf-toggle-row.is-active .hf-toggle-track {
          background: var(--red);
        }
        .hf-toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: transform var(--motion-duration) var(--motion-ease);
        }
        .hf-toggle-row.is-active .hf-toggle-thumb {
          transform: translateX(16px);
        }
      `}</style>
    </button>
  );
}