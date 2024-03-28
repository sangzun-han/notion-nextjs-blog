import Image from "next/image";
import Category from "../category/category";
import siteConfig from "../../../site.config";

type SidebarProps = {
  allCategories: {
    name: string;
    color: string;
  }[];
};

export default function Sidebar({ allCategories }: SidebarProps) {
  return (
    <div className="border-b lg:border-b-0 lg:border-r border-gray-100 px-2 pb-2">
      <aside className="bg-white p-5 sticky top-24 text-center rounded-xl dark:bg-[#3a3f41] dark:text-white">
        <h1 className="mb-4 border border-slate-200 rounded-full w-24 h-24 mx-auto flex justify-center items-center">
          <Image
            src={siteConfig.profileImage}
            alt={siteConfig.profileImage}
            width={100}
            height={100}
            className="rounded-full w-full"
          />
        </h1>
        <p className="text-slate-500 mb-4 dark:text-white">{siteConfig.description}</p>
        <nav>
          <ul className="flex lg:flex-col gap-x-3 lg:gap-0 space-y-0 lg:space-y-3 flex-wrap gap-y-4 justify-start sm:justify-center">
            {allCategories.map((category) => (
              <Category category={category} key={category.name} isMove={true} />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
