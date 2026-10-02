import { setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import { BlogIndexContent } from "@/components/blog/BlogIndexContent";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);

  return (
    <BlogIndexContent
      posts={posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        excerpt: p.excerpt,
        readingTime: p.readingTime,
      }))}
    />
  );
}