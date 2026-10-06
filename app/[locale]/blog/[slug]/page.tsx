import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import {
  PriceTable,
  CostGrid,
  Callout,
  MdxCta,
} from "@/components/mdx/MdxComponents";
import { ProviderLink } from "@/components/mdx/ProviderLink";
import { ProviderCta } from "@/components/mdx/ProviderCta";

export function generateStaticParams() {
  const locales = ["en", "es", "fr"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of getAllSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const related = getRelatedPosts(slug, locale, 3);

  const mdxContent = (
    <MDXRemote
      source={post.content}
      components={{
        PriceTable,
        CostGrid,
        Callout,
        MdxCta,
        ProviderLink,
        ProviderCta,
      }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );

  return (
    <BlogPostContent
      post={{
        slug: post.slug,
        title: post.title,
        category: post.category,
        date: post.date,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
      }}
      mdxContent={mdxContent}
      related={related.map((r) => ({
        slug: r.slug,
        title: r.title,
        category: r.category,
        readingTime: r.readingTime,
      }))}
    />
  );
}