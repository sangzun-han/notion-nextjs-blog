import SearchBar from "@/components/search/search-bar";
import PostList from "@/components/posts/post-list";
import Sidebar from "@/components/sidebar/sidebar";
import { getAllPosts } from "@/services/posts";
import { CategoryInfo, Post } from "@/types/posts";
import { Suspense } from "react";

export const revalidate = 60 * 60 * 24;

export const metadata = {
  title: "Welecom | sangzun's blog",
};

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();
  const allCategories: CategoryInfo[] = Array.from(
    new Set(posts.flatMap((post) => post.category.map((cat) => JSON.stringify(cat))))
  ).map((catStr) => JSON.parse(catStr));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
        <Suspense>
          <Sidebar allCategories={allCategories} />
          <main className="space-y-6 grid grid-cols-1 lg:col-span-3 lg:block lg:gap-6">
            <SearchBar />
            <PostList posts={posts} isFilter={true} />
          </main>
        </Suspense>
      </div>
    </div>
  );
}
