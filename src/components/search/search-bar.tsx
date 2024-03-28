"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { atomSeartState } from "@/recoil/atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export default function SearchBar() {
  const [term, setTerm] = useRecoilState<string>(atomSeartState);

  useEffect(() => {
    setTerm("");
  }, [setTerm]);

  return (
    <div className="col-span-3 relative">
      <Search className="absolute top-2 left-4 flex items-center text-xl text-slate-400" />
      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}
        className="pl-12 py-1.5 rounded-full border-slate-400 border w-full focus:ring-0 focus:border-slate-500 active:border-slate-500 dark:dark:bg-[#3a3f41] dark:text-white"
      />
    </div>
  );
}
