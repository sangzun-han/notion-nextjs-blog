import PostList from "@/components/posts/post-list";
import { getAllPosts } from "@/services/posts";
import { notFound } from "next/navigation";
import { CategoryInfo } from "@/types/posts";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};
export default async function CategoryPage({ params: { slug } }: CategoryPageProps) {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((post) =>
    post.category.some((category) => category.name.toLowerCase() === slug.toLowerCase())
  );

  if (filteredPosts.length === 0) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="grid grid-cols-1 gap-10">
        <main className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6">
          <PostList posts={filteredPosts} isFilter={false} />
        </main>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const allCategories: CategoryInfo[] = Array.from(
    new Set(posts.flatMap((post) => post.category.map((cat) => JSON.stringify(cat))))
  ).map((catStr) => JSON.parse(catStr));

  return allCategories.map((category) => ({
    slug: category.name,
  }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const posts = await getAllPosts();
  const decodedSlug = decodeURIComponent(slug);

  const categoryPost = posts.find((post) =>
    post.category.some((category) => category.name.toLowerCase() === decodedSlug.toLowerCase())
  );

  return {
    title: `${decodedSlug} - sangzun'log`,
    openGraph: {
      metadataBase: process.env.NODE_ENV === "production" ? "https://sangzun-log.vercel.app" : "http://localhost:3000",
      images: [
        {
          url: categoryPost?.cover ? categoryPost.cover : "default.jpeg",
          width: 400,
          height: 300,
        },
      ],
    },
  };
}
