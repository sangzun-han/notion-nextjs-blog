type SiteConfig = {
  title: string;
  profileImage: string;
  defaultImage: string;
  name: string;
  description: string;
  favicon: string;
};

// siteConfig 객체 생성
const siteConfig: SiteConfig = {
  title: "sangzun's log", // 사이트 이름
  profileImage: "/profile.webp", // 프로필 이미지 경로
  defaultImage: "/default.jpeg",
  name: "sangzun", // 이름
  description: "안녕하세요 프론트엔드 개발자 한상준 입니다.", // 사이트 설명
  favicon: "/favicon.ico",
};

// siteConfig 객체 export
export default siteConfig;
