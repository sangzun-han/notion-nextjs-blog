export type CategoryInfo = {
  name: string;
  color: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  category: CategoryInfo[];
  date: string;
  lastEditedAt: number;
  cover: string;
};
