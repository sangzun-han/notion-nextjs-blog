"use client";

import { useRouter, useSearchParams } from "next/navigation";

type CategoryProps = {
  category: {
    name: string;
    color: string;
  };
  isMove: boolean;
};

type ColorVariants = {
  [key: string]: string;
};

const colorVariants: ColorVariants = {
  purple: "bg-notion-purple hover:bg-notion-purple/40 text-black dark:text-white",
  gray: "bg-notion-gray hover:bg-notion-gray/50 text-black dark:text-white",
  brown: "bg-notion-brown hover:bg-notion-brown/40 text-black dark:text-white",
  blue: "bg-notion-blue hover:bg-notion-blue/40 text-black dark:text-white",
  yellow: "bg-notion-yellow hover:bg-notion-yellow/40 text-black dark:text-white",
  red: "bg-notion-red hover:bg-notion-red/40 text-black dark:text-white",
  green: "bg-notion-green hover:bg-notion-green/40 text-black dark:text-white",
  pink: "bg-notion-pink hover:bg-notion-pink/40 text-black dark:text-white",
  orange: "bg-notion-orange hover:bg-notion-orange/40 text-black dark:text-white",
  default: "bg-notion-default hover:bg-notion-default/40 text-black dark:text-white",
};

export default function Category({ category, isMove }: CategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMove) {
      const params = new URLSearchParams(searchParams);
      params.set("category", category.name); // URL에 category 쿼리 파라미터를 설정합니다.
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        colorVariants[category.color] || colorVariants.default
      } inline-flex p-2 px-3 cursor-pointer text-xs rounded-full items-center justify-center`}
    >
      {category.name}
    </button>
  );
}
