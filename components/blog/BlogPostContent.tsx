"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  readingTime: string;
}

interface Related {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
}

const STYLES = `
.hf-post {
  max-width: 780px;
  margin: 0 auto;
  padding: 64px 0 0;
}
.hf-post-head {
  margin-bottom: 48px;
}
.hf-post-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.hf-post-meta .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gold);
}
.hf-post-meta .with-icon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.hf-post-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--ink);
}
.hf-post-excerpt {
  font-family: var(--font-body);
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--ink-muted);
  font-style: italic;
}
.hf-post-cover {
  aspect-ratio: 16 / 9;
  margin: 40px 0 56px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface-alt);
}
.hf-post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hf-post-body {
  font-family: var(--font-body);
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--ink);
}
.hf-post-body :global(h2) {
  font-family: var(--font-display);
  font-size: 1.8rem;
  line-height: 1.2;
  margin: 56px 0 20px;
  color: var(--ink);
}
.hf-post-body :global(h3) {
  font-family: var(--font-display);
  font-size: 1.35rem;
  margin: 40px 0 16px;
  color: var(--ink);
}
.hf-post-body :global(p) {
  margin: 0 0 24px;
}
.hf-post-body :global(ul),
.hf-post-body :global(ol) {
  margin: 0 0 24px;
  padding-left: 1.4em;
}
.hf-post-body :global(li) {
  margin-bottom: 10px;
}
.hf-post-body :global(a) {
  color: var(--red);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.hf-post-body :global(a:hover) {
  color: var(--red-hover);
}
.hf-post-body :global(strong) {
  font-weight: 700;
  color: var(--ink);
}
.hf-post-body :global(em) {
  font-style: italic;
  color: var(--ink-muted);
}
.hf-post-body :global(hr) {
  border: 0;
  border-top: 1px solid color-mix(in oklab, var(--gold) 40%, transparent);
  margin: 56px auto;
  max-width: 120px;
}
.hf-post-body :global(blockquote) {
  border-left: 3px solid var(--gold);
  padding-left: 24px;
  margin: 32px 0;
  font-style: italic;
  color: var(--ink-muted);
}
.hf-post-body :global(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.92em;
  background: var(--surface-alt);
  padding: 2px 6px;
  border-radius: 4px;
}
.hf-post-trust {
  margin-top: 64px;
  padding: 28px;
  background: var(--surface-alt);
  border-left: 3px solid var(--gold);
  border-radius: var(--radius-md);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.hf-post-trust-icon {
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}
.hf-post-trust-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--ink);
}
.hf-post-trust-body {
  color: var(--ink-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}
.hf-post-related {
  margin-top: 80px;
  padding-top: 56px;
  border-top: 1px solid var(--border);
}
.hf-post-related-head {
  font-family: var(--font-display);
  font-size: 1.6rem;
  margin: 0 0 32px;
  text-align: center;
}
.hf-post-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.hf-post-related-card {
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-post-related-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}
.hf-post-related-cat {
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--gold);
}
.hf-post-related-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.3;
  margin: 0;
}
.hf-post-related-meta {
  font-size: 0.78rem;
  color: var(--ink-muted);
}
.hf-post-cta {
  margin-top: 80px;
  padding: 60px 32px;
  background: var(--red);
  border-radius: var(--radius-lg);
  text-align: center;
  color: #fff;
}
.hf-post-cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #fff;
  margin: 0 0 12px;
}
.hf-post-cta-sub {
  color: color-mix(in oklab, #fff 80%, transparent);
  margin: 0 0 24px;
  font-size: 1rem;
}
.hf-post-cta-btn {
  background: #fff;
  color: var(--red);
  border: 1px solid var(--gold);
}
.hf-post-cta-btn:hover {
  background: var(--gold);
  color: #1A1614;
}
`;

export function BlogPostContent({
  post,
  mdxContent,
  related,
}: {
  post: Post;
  mdxContent: React.ReactNode;
  related: Related[];
}) {
  const t = useTranslations("blogPost");

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="hf-post">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <header className="hf-post-head">
        <div className="hf-post-meta">
          <span>{post.category}</span>
          <span className="dot" />
          <span>{formattedDate}</span>
          <span className="dot" />
          <span className="with-icon">
            <Clock size={12} strokeWidth={2} />
            {post.readingTime}
          </span>
        </div>
        <h1 className="hf-post-title">{post.title}</h1>
        <p className="hf-post-excerpt">{post.excerpt}</p>
      </header>

      {post.coverImage && (
        <div className="hf-post-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      <div className="hf-post-body">{mdxContent}</div>

      <div className="hf-post-trust">
        <ShieldCheck size={22} strokeWidth={1.8} className="hf-post-trust-icon" />
        <div>
          <p className="hf-post-trust-title">{t("trustTitle")}</p>
          <p className="hf-post-trust-body">{t("trustBody")}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="hf-post-related">
          <h2 className="hf-post-related-head">{t("relatedTitle")}</h2>
          <div className="hf-post-related-grid">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="hf-post-related-card"
              >
                <span className="hf-post-related-cat">{r.category}</span>
                <h3 className="hf-post-related-title">{r.title}</h3>
                <span className="hf-post-related-meta">{r.readingTime}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="hf-post-cta">
        <h2 className="hf-post-cta-title">{t("ctaTitle")}</h2>
        <p className="hf-post-cta-sub">{t("ctaSub")}</p>
        <Link href="/quote" className="btn hf-post-cta-btn">
          {t("ctaButton")}
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </section>
    </article>
  );
}