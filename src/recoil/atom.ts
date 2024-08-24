import { atom } from "recoil";

export const atomSeartState = atom<string>({
  key: "@atom-search-state",
  default: "",
});

export const atomCategoryState = atom<string | null>({
  key: "@atom-category-state",
  default: null,
});
