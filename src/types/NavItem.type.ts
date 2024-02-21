interface NavItemProps {
  title: string;
  path: string;
}

const role = localStorage.getItem('role');

export const NavItemList: NavItemProps[] = [
  { title: "FEED", path: "/feed" },
  { title: "CHALLENGE", path: "/challenge" },
  // { title: "DASHBOARD", path: "/dashboard" },
  { title: "SOCIAL", path: "/social" },
  { title: "GROW", path: "/grow" },
  { title: "PROFILE", path: "/profile"},
  { title: "MESSAGE", path: "/chat"},
  ...(role === "ADMIN" ? [{ title: "ADMIN", path: "/admin" }] : [])
];