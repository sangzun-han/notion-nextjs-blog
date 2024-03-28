type SiteConfig = {
  title: string;
  profileImage: string;
  name: string;
  description: string;
};

// siteConfig 객체 생성
const siteConfig: SiteConfig = {
  title: "sangzun's log", // 사이트 이름
  profileImage: "/profile.webp", // 프로필 이미지 경로
  name: "sangzun", // 이름
  description: "안녕하세요 개발자 입니다.", // 사이트 설명
};

// siteConfig 객체 export
export default siteConfig;
