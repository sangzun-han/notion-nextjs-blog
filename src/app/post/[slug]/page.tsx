import NotionPage from "@/components/notion/notion-page";
import { getRecordMap } from "@/libs/notion";
import { getAllPosts } from "@/services/posts";
import { notFound } from "next/navigation";
import { CONFIG } from "../../../../site.config";

type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const posts = await getAllPosts();
  const decodedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug.replace(/\s+/g, "-") === decodedSlug);

  if (!post) return notFound();

  const recordMap = await getRecordMap(post.id);

  return <NotionPage post={post} recordMap={recordMap} />;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const posts = await getAllPosts();
  const decodedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug === decodedSlug);

  return post
    ? {
        title: post.title,
        description: post.slug,
        alternate: {
          canonical: `https://sangzun-log.vercel.app/post/${decodedSlug}`,
        },
        openGraph: {
          type: "website",
          url: `https://sangzun-log.vercel.app/post/${decodedSlug}`,
          metadataBase: `${CONFIG.url}/post`,
          images: [
            {
              url: post.cover ? post.cover : CONFIG.defaultImage,
              width: 400,
              height: 300,
            },
          ],
        },
      }
    : {};
}
