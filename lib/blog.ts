import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  content: string;
  readingTime: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getPostFiles(locale: string): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(locale: string): BlogPost[] {
  const slugs = getPostFiles(locale);

  // If no posts in requested locale, fall back to English
  const effectiveLocale = slugs.length > 0 ? locale : "en";
  const effectiveSlugs =
    effectiveLocale === locale ? slugs : getPostFiles("en");

  const posts = effectiveSlugs
    .map((slug) => getPostBySlug(slug, effectiveLocale))
    .filter((p): p is BlogPost => p !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(
  slug: string,
  locale: string
): BlogPost | null {
  // Try requested locale first, then fall back to English
  const localesToTry = [locale, "en"];
  const tried = new Set<string>();

  for (const loc of localesToTry) {
    if (tried.has(loc)) continue;
    tried.add(loc);

    const filePath = path.join(CONTENT_DIR, loc, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    return {
      slug,
      locale: loc,
      title: data.title ?? slug,
      category: data.category ?? "General",
      date: data.date ?? new Date().toISOString().slice(0, 10),
      excerpt: data.excerpt ?? "",
      coverImage: data.coverImage,
      content,
      readingTime: `${Math.max(1, Math.ceil(rt.minutes))} min read`,
    };
  }

  return null;
}

export function getAllSlugs(locale: string): string[] {
  const slugs = getPostFiles(locale);
  if (slugs.length > 0) return slugs;
  return getPostFiles("en");
}

export function getRelatedPosts(
  currentSlug: string,
  locale: string,
  limit = 3
): BlogPost[] {
  const all = getAllPosts(locale);
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}