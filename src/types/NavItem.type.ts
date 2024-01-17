interface NavItemProps {
  title: string;
  path: string;
}

export const NavItemList: NavItemProps[] = [
  { title: "CHALLENGE", path: "/challenge" },
  { title: "FEED", path: "/feed" },
  { title: "DASHBOARD", path: "/dashboard" },
  { title: "SOCIAL", path: "/social" },
  { title: "GROW", path: "/grow" },
];