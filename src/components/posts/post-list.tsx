"use client";

import { Post } from "@/types/posts";
import PostCard from "./post-card";
import usePosts from "@/hooks/use-posts";

type PostListProps = {
  posts: Post[];
  isFilter?: boolean;
};
export default function PostList({ posts, isFilter = true }: PostListProps) {
  const { filteredPosts } = usePosts(posts, isFilter);

  return (
    <>
      {filteredPosts.length > 0 ? (
        <div className="lg:col-span-3 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          {filteredPosts.map((post: Post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="grid lg:col-span-3 lg:space-y-0 lg:grid lg:grid-cols-2">
          <h3 className="text-base font-bold text-black dark:text-white">Nothing! 🤣 </h3>
        </div>
      )}
    </>
  );
}
