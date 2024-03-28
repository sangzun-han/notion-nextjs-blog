import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100 text-black">
      <div className="container px-5 py-8 text-center">
        <svg
          className="mx-auto mb-4 w-20 h-20 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="mb-6 text-3xl md:text-4xl font-bold">페이지를 찾을 수 없습니다.</h1>
        <Link href="/" className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-lg">
          돌아가기
        </Link>
      </div>
    </div>
  );
}
