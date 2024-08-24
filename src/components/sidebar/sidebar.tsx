import Image from "next/image";
import { CONFIG } from "../../../site.config";
import Category from "../category/category";

type SidebarProps = {
  allCategories: {
    name: string;
    color: string;
  }[];
};

export default function Sidebar({ allCategories }: SidebarProps) {
  return (
    <div className="px-2 pb-2 lg:max-w-[241px] lg:max-h-[372px] lg:sticky lg:top-28 top-0 static">
      <aside className="bg-white p-5 sticky top-24 lg:text-center text-left rounded-xl dark:bg-[#3a3f41] dark:text-white shadow-lg border border-slate-200 dark:border-none mb-8 lg:block flex flex-col items-center xs:flex-row xs:items-start">
        <div className="lg:mb-4 mb-0 rounded-full lg:w-36 lg:h-36 lg:mx-auto mx-0 w-24 h-24  flex justify-center items-center relative flex-shrink-0">
          <Image src={CONFIG.profile.image} alt="프로필 이미지" className="rounded-full" width={200} height={200} />
        </div>
        <div className="flex flex-col lg:items-center items-center justify-center lg:ml-0 ml-4 xs:items-start">
          <div className="text-xl font-bold lg:mb-2 mb-0">{CONFIG.profile.name}</div>
          <div className=" text-slate-500 dark:text-slate-300 text-sm mb-4">{CONFIG.profile.role}</div>
          <div className="lg:text-md text-sm text-black dark:text-white text-left">{CONFIG.profile.about}</div>
        </div>
      </aside>
      <nav>
        <ul className="flex lg:flex-col gap-x-3 lg:gap-0 space-y-0 lg:space-y-3 flex-wrap gap-y-4 justify-start">
          {allCategories.map((category) => (
            <Category category={category} key={category.name} isMove={true} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
