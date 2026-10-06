"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface PostSummary {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readingTime: string;
  coverImage?: string;
}

const STYLES = `
.hf-blog {
  padding: 80px 0;
}
.hf-blog-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 64px;
}
.hf-blog-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.1;
  margin: 14px 0 20px;
}
.hf-blog-sub {
  color: var(--ink-muted);
  font-size: 1.1rem;
  line-height: 1.6;
}
.hf-blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
}
.hf-blog-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--motion-duration) var(--motion-ease);
}
.hf-blog-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.hf-blog-card-img {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--surface-alt);
  position: relative;
}
.hf-blog-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--motion-ease);
  display: block;
}
.hf-blog-card:hover .hf-blog-card-img img {
  transform: scale(1.05);
}
.hf-blog-card-img-placeholder {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(
      circle at 30% 30%,
      color-mix(in oklab, var(--red) 25%, transparent),
      transparent 60%
    ),
    radial-gradient(
      circle at 70% 70%,
      color-mix(in oklab, var(--gold) 20%, transparent),
      transparent 60%
    ),
    var(--surface-alt);
}
.hf-blog-card-body {
  padding: 24px 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.hf-blog-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--gold);
}
.hf-blog-card-meta .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gold);
}
.hf-blog-card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.3;
  margin: 0;
  color: var(--ink);
}
.hf-blog-card-excerpt {
  color: var(--ink-muted);
  font-size: 0.94rem;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}
.hf-blog-card-cta {
  margin-top: auto;
  padding-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-accent);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--red);
  transition: gap var(--motion-duration) var(--motion-ease);
}
.hf-blog-card:hover .hf-blog-card-cta {
  gap: 14px;
}
.hf-blog-empty {
  text-align: center;
  padding: 80px 24px;
  color: var(--ink-muted);
  font-style: italic;
}
`;

export function BlogIndexContent({ posts }: { posts: PostSummary[] }) {
  const t = useTranslations("blogIndex");

  return (
    <section className="hf-blog">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="hf-blog-head">
        <p className="accent-label">{t("eyebrow")}</p>
        <h1 className="hf-blog-title">{t("title")}</h1>
        <p className="hf-blog-sub">{t("subtitle")}</p>
      </div>

      {posts.length === 0 ? (
        <p className="hf-blog-empty">{t("empty")}</p>
      ) : (
        <div className="hf-blog-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="hf-blog-card"
            >
              <div className="hf-blog-card-img">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="hf-blog-card-img-placeholder" aria-hidden />
                )}
              </div>
              <div className="hf-blog-card-body">
                <div className="hf-blog-card-meta">
                  <span>{post.category}</span>
                  <span className="dot" />
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="hf-blog-card-title">{post.title}</h2>
                <p className="hf-blog-card-excerpt">{post.excerpt}</p>
                <span className="hf-blog-card-cta">
                  {t("read")}
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}