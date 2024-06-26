import Image from "next/image";
import Category from "../category/category";
import { CONFIG } from "../../../site.config";

type SidebarProps = {
  allCategories: {
    name: string;
    color: string;
  }[];
};

export default function Sidebar({ allCategories }: SidebarProps) {
  return (
    <div className="border-b lg:border-b-0 lg:border-r border-gray-100 px-2 pb-2">
      <aside className="bg-white p-5 sticky top-24 text-center rounded-xl dark:bg-[#3a3f41] dark:text-white shadow-lg border border-slate-200 dark:border-none">
        <div className="mb-4 border border-slate-200 rounded-full w-24 h-24 mx-auto flex justify-center items-center">
          <Image
            src={CONFIG.profile.image}
            alt="프로필 이미지"
            width={100}
            height={100}
            className="rounded-full w-full"
          />
        </div>
        <p className="text-slate-500 mb-2 dark:text-slate-300 text-sm">{CONFIG.profile.role}</p>
        <p className="text-slate-400 mb-2 dark:text-white">{CONFIG.profile.about}</p>
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
