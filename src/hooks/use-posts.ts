import { atomSeartState } from "@/recoil/atom";
import { Post } from "@/types/posts";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export default function usePosts(posts: Post[], isFilter: boolean) {
  const term = useRecoilValue(atomSeartState);

  const filteredPosts = useMemo(() => {
    if (!term || !isFilter) return posts;

    return posts.filter((post) => {
      return post.title.toLowerCase().includes(term.toLowerCase());
    });
  }, [posts, term, isFilter]);

  return { filteredPosts };
}
