"use client";

import "@/styles/notion.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import dynamic from "next/dynamic";

import { ExtendedRecordMap } from "notion-types";
import { Post } from "@/types/posts";
import { NotionRenderer } from "react-notion-x";
import { Block } from "notion-types";
import { useTheme } from "next-themes";
import useMounted from "@/hooks/use-mounted";

type NotionPageProps = {
  post: Post;
  recordMap: ExtendedRecordMap;
};

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
  ssr: false,
});

export default function NotionPage({ post, recordMap }: NotionPageProps) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const { mounted } = useMounted();

  return (
    <div className="mt-4">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={mounted ? currentTheme === "dark" : false}
        forceCustomImages={true}
        showTableOfContents={true}
        disableHeader={true}
        mapImageUrl={(url, block) => mapImageUrl(url, block) || ""}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
        }}
      />
    </div>
  );
}

export function mapImageUrl(url: string, block: Block): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith("data:")) {
    return url;
  }

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith("https://images.unsplash.com")) {
    return url;
  }

  try {
    const u = new URL(url);

    if (u.pathname.startsWith("/secure.notion-static.com") && u.hostname.endsWith(".amazonaws.com")) {
      if (
        u.searchParams.has("X-Amz-Credential") &&
        u.searchParams.has("X-Amz-Signature") &&
        u.searchParams.has("X-Amz-Algorithm")
      ) {
        // if the URL is already signed, then use it as-is
        return url;
      }
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }

  url = `https://www.notion.so${url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`}`;

  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === "space" ? "block" : block.parent_table;
  if (table === "collection" || table === "team") {
    table = "block";
  }
  notionImageUrlV2.searchParams.set("table", table);
  notionImageUrlV2.searchParams.set("id", block.id);
  notionImageUrlV2.searchParams.set("cache", "v2");

  url = notionImageUrlV2.toString();

  return url;
}
