import { atom } from "recoil";

export const atomSeartState = atom<string>({
  key: "@atom-search-state",
  default: "",
});
