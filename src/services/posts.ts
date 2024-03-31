import { getRecordMap, mapImageUrl } from "@/libs/notion";
import { Post } from "@/types/posts";
import { NOTION_DATABASE_ID } from "../../config";
import { Block } from "notion-types";

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

// 노션에서 모든 database값들은 가져온다.
export async function getAllPosts() {
  const allPosts: Post[] = [];
  const recordMap = await getRecordMap(NOTION_DATABASE_ID);
  const { block, collection } = recordMap;

  const schema = Object.values(collection)[0].value.schema;
  const propertyMap: Record<string, string> = {};
  const categoryMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    const field = schema[key];
    propertyMap[field.name] = key;
    if (field.type === "multi_select") {
      field.options?.forEach((option) => {
        categoryMap[option.value] = option.color;
      });
    }
  });

  Object.keys(block).forEach((pageId) => {
    if (block[pageId].value.type === "page" && block[pageId].value.properties[propertyMap["category"]]) {
      const { properties, last_edited_time } = block[pageId].value;
      const contents = block[pageId].value.content || [];
      const dates = contents.map((content) => {
        return block[content]?.value.last_edited_time;
      });

      dates.push(last_edited_time);
      dates.sort((a, b) => b - a);
      const lastEditedAt = dates[0];

      const id = pageId;
      const slug = properties[propertyMap["slug"]][0][0];
      const title = properties[propertyMap["title"]][0][0];
      const date = properties[propertyMap["date"]]?.[0]?.[1]?.[0]?.[1]?.["start_date"] ?? formattedDate;
      const src: string = recordMap.block[pageId].value.format?.page_cover;

      let cover;
      if (!src) cover = "default.jpeg";
      else if (src.startsWith("https://")) cover = mapImageUrl(src, recordMap.block[pageId]?.value) ?? "default.jpeg";
      else cover = `https://notion.so${src}`;

      let categoriesWithColor = [];
      if (properties[propertyMap["category"]]) {
        categoriesWithColor = properties[propertyMap["category"]][0][0].split(",").map((categoryName: string) => ({
          name: categoryName,
          color: categoryMap[categoryName] || "default",
        }));
      }

      allPosts.push({
        id,
        title,
        slug,
        category: categoriesWithColor,
        date,
        lastEditedAt,
        cover,
      });
    }
  });
  return allPosts;
}
