interface NavItemProps {
  title: string;
  path: string;
}
const userRole = localStorage.getItem('userRole');

export const NavItemList: NavItemProps[] = [
  { title: "FEED", path: "/feed" },
  { title: "CHALLENGE", path: "/challenge" },
  { title: "DASHBOARD", path: "/dashboard" },
  { title: "SOCIAL", path: "/social" },
  { title: "GROW", path: "/grow" },
  { title: "PROFILE", path: "/profile"},
  { title: "MESSAGE", path: "/chat"},
  ...(userRole === "ADMIN" ? [{ title: "ADMIN", path: "/admin" }] : [])
];