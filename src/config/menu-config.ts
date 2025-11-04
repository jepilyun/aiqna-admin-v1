// 타입 정의 추가
type SubMenuItem = {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type MenuItem = {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SubMenuItem[];
};

// menu-config.ts
export const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "YouTube Videos",
    url: "/youtube-videos",
    children: [
      { title: "YouTube Videos", url: "/youtube-videos" },
      { title: "Processing Status", url: "/processing-status-youtube-videos" },
    ],
  },
  {
    title: "Instagram Posts",
    url: "/instagram-posts",
    children: [
      { title: "Instagram Posts", url: "/instagram-posts" },
      { title: "Processing Status", url: "/processing-status-instagram-posts" },
    ],
  },
  {
    title: "Blog Posts",
    url: "/blog-posts",
    children: [
      { title: "Blog Posts", url: "/blog-posts" },
      { title: "Processing Status", url: "/processing-status-blog-posts" },
    ],
  },
  {
    title: "Texts",
    url: "/texts",
    children: [
      { title: "Texts", url: "/texts" },
      { title: "Processing Status", url: "/processing-status-texts" },
    ],
  },
  {
    title: "YouTube Channels",
    url: "/youtube-channels",
  },
  {
    title: "QnA",
    url: "/qna",
  },
  {
    title: "Users",
    url: "/users",
  },
  {
    title: "Administrators",
    url: "/administrators",
  },
];
