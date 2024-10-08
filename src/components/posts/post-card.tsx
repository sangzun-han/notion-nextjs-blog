import Link from "next/link";
import Image from "next/image";
import Category from "../category/category";
import { Post } from "@/types/posts";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const { title, slug, category, date, cover } = post;

  const formattedSlug = slug.replace(/\s+/g, "-");
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Link href={`/post/${formattedSlug}`}>
      <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 dark:bg-[#3a3f41]">
        <figure>
          <Image
            className="w-full h-48 object-cover"
            src={cover}
            alt="post cover image"
            width={400}
            height={200}
            priority
          />
        </figure>
        <div className="p-5">
          <header>
            <time className="text-slate-400 text-sm dark:text-slate-300">{formattedDate}</time>
            <p className="text-xl font-semibold mb-3 dark:text-white truncate">{title}</p>
            <p className="text-slate-500 dark:text-slate-300 truncate">{slug}</p>
          </header>

          <footer className="flex flex-wrap gap-2 text-[#37352F] pt-2">
            {category.map((category) => (
              <Category category={category} key={category.name} isMove={false} />
            ))}
          </footer>
        </div>
      </article>
    </Link>
  );
}
