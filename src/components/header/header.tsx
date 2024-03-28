import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import siteConfig from "../../../site.config";

const MENU_ITEMS = [{ path: "about", name: "About" }];

export default function Header() {
  return (
    <div className="bg-white w-full sticky top-0 z-50 backdrop-blur-xl py-4 p-8 text-black dark:bg-[#2f3437] dark:text-white border-b border-gray-200 dark:border-b-gray-200">
      <header className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="selt-start">
            <h1 className="text-xl font-bold">{siteConfig.title}</h1>
          </Link>
          <ul className="flex items-center cursor-pointer gap-x-4">
            <ThemeToggle />
            {MENU_ITEMS.map((item) => (
              <li
                key={item.path}
                className="text-black font-medium hover:text-black/50 dark:text-white dark:hover:text-white/50"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}
