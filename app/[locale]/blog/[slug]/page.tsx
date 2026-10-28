import type { Metadata } from "next";
import { serviceMetadata, SERVICE_BASE } from "@/lib/serviceSeo";
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

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {locale,slug}=await params;
  const post=getPostBySlug(slug,locale);
  if(!post) return {};
  const metadata=serviceMetadata(locale, `/blog/${slug}`, post.title, post.excerpt, post.coverImage);
  return {...metadata, openGraph: {...metadata.openGraph, type: 'article', publishedTime: new Date(post.date).toISOString(), authors: ['Homefront Journal'], section: post.category}};
}

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

  const pageUrl = `${SERVICE_BASE}/${locale}/blog/${slug}`;
  const labels = ({en: {home: 'Home', blog: 'Journal'}, es: {home: 'Inicio', blog: 'Diario'}, fr: {home: 'Accueil', blog: 'Journal'}})[locale as 'en'|'es'|'fr'];
  const schema = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'BlogPosting', '@id': `${pageUrl}#article`, headline: post.title, description: post.excerpt,
      url: pageUrl, mainEntityOfPage: pageUrl, inLanguage: locale, datePublished: new Date(post.date).toISOString(),
      author: {'@type': 'Organization', name: 'Homefront Journal', url: SERVICE_BASE},
      publisher: {'@type': 'Organization', name: 'Homefront Journal', url: SERVICE_BASE},
      ...(post.coverImage ? {image: {'@type': 'ImageObject', url: `${SERVICE_BASE}${post.coverImage}`, caption: post.coverImageAlt ?? post.title}} : {})},
    {'@type': 'BreadcrumbList', itemListElement: [
      {'@type': 'ListItem', position: 1, name: labels.home, item: `${SERVICE_BASE}/${locale}`},
      {'@type': 'ListItem', position: 2, name: labels.blog, item: `${SERVICE_BASE}/${locale}/blog`},
      {'@type': 'ListItem', position: 3, name: post.title, item: pageUrl},
    ]},
  ]};

  const related = post.showRelated === false ? [] : getRelatedPosts(slug, locale, 3);

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
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, "\\u003c")}} />
    <BlogPostContent
      post={{
        slug: post.slug,
        title: post.title,
        category: post.category,
        date: post.date,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        coverImageAlt: post.coverImageAlt,
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
    </>
  );
}
