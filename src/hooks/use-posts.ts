import { atomCategoryState, atomSeartState } from "@/recoil/atom";
import { Post } from "@/types/posts";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export default function usePosts(posts: Post[], isFilter: boolean) {
  const searchParams = useSearchParams();
  const term = useRecoilValue(atomSeartState);
  const selectedCategory = searchParams.get("category");

  const filteredPosts = useMemo(() => {
    if (!isFilter) return posts;

    return posts.filter((post) => {
      const matchesTerm = term ? post.title.toLowerCase().includes(term.toLowerCase()) : true;
      const matchesCategory = selectedCategory ? post.category.some((cat) => cat.name === selectedCategory) : true;
      return matchesTerm && matchesCategory;
    });
  }, [posts, term, selectedCategory, isFilter]);

  return { filteredPosts };
}
