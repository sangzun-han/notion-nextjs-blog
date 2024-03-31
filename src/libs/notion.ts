import { NotionAPI } from "notion-client";
import { Block } from "notion-types";
import { NOTION_TOKEN_V2 } from "../../config";
import { notionRequestQueue } from "@/services/notion";

const notion = new NotionAPI({ authToken: NOTION_TOKEN_V2 });

export async function getRecordMap(id: string, retryCount = 0) {
  try {
    const request = async () => {
      return await notion.getPage(id, { concurrency: 1 });
    };
    return await notionRequestQueue.add(request);
  } catch (error: any) {
    const maxRetries = 3; // 최대 재시도 횟수
    console.dir(error.response, { depth: null });
    if (retryCount < maxRetries && error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || 1; // 기본 대기 시간을 1초로 설정
      console.log(`Retrying after ${retryAfter} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return getRecordMap(id, retryCount + 1); // 재시도
    } else {
      throw error; // 재시도 횟수를 초과하거나 429 외의 다른 오류인 경우 에러를 다시 throw
    }
  }
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
