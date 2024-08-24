import NotionPage from "@/components/notion/notion-page";
import { getRecordMap } from "@/libs/notion";
import { getAllPosts } from "@/services/posts";
import { notFound } from "next/navigation";
import { CONFIG } from "../../../../site.config";
import { Post } from "@/types/posts";

type PostPageProps = {
  params: {
    slug: string;
  };
};

let cachedPosts: Post[] | null = null; // 전역 변수로 캐시된 포스트 데이터

export const revalidate = 60 * 60 * 24;

async function fetchPosts() {
  if (!cachedPosts) {
    cachedPosts = await getAllPosts(); // 캐시되지 않은 경우에만 데이터 호출
  }
  return cachedPosts;
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const posts = await fetchPosts();
  const decodedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug.replace(/\s+/g, "-") === decodedSlug);

  if (!post) return notFound();

  const recordMap = await getRecordMap(post.id);

  return <NotionPage post={post} recordMap={recordMap} />;
}

export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map((post) => ({
    slug: post.slug.replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const posts = await fetchPosts();
  const decodedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.slug.replace(/\s+/g, "-") === decodedSlug);

  if (!post) {
    return {};
  }

  return {
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
  };
}
