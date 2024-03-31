import NotionPage from "@/components/notion/notion-page";
import { getRecordMap } from "@/libs/notion";
import { getAllPosts } from "@/services/posts";
import { notFound } from "next/navigation";
import siteConfig from "../../../../site.config";

type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const posts = await getAllPosts();
  const decodeedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug === decodeedSlug);

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
  const decodeedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug === decodeedSlug);

  return post
    ? {
        title: post.title,
        openGraph: {
          metadataBase:
            process.env.NODE_ENV === "production" ? "https://sangzun-log.vercel.app" : "http://localhost:3000",
          images: [
            {
              url: post.cover ? post.cover : siteConfig.defaultImage,
              width: 400,
              height: 300,
            },
          ],
        },
      }
    : {};
}
