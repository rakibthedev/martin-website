export const SITE_NAV = [
  { label: "Home", href: "/" },
  { label: "Browse Firms", href: "/firms" },
  { label: "Challenges", href: "/challenges" },
  { label: "Offers", href: "/offers" },
  { label: "Compare", href: "/compare" },
  { label: "Articles", href: "/articles" },
  { label: "Referrals", href: "/referrals" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Favourite Firms", href: "/favourite-firms" },
] as const;

export type AccountSection =
  | "overview"
  | "reviews"
  | "favourites"
  | "comparisons"
  | "claimed-offers"
  | "referrals"
  | "notifications"
  | "settings";

/** Account sidebar rows (Figma: Account / Sidebar item). `icon` is the Iconsax name without colour. */
export const ACCOUNT_NAV: {
  id: AccountSection;
  label: string;
  href: string;
  icon: string;
  count?: number;
  group: "account" | "settings";
}[] = [
  { id: "overview", label: "Overview", href: "/account", icon: "category", group: "account" },
  { id: "reviews", label: "My reviews", href: "/account/reviews", icon: "document-text", count: 6, group: "account" },
  { id: "favourites", label: "Favourite firms", href: "/account/favourites", icon: "heart", count: 3, group: "account" },
  { id: "comparisons", label: "Comparisons", href: "/account/comparisons", icon: "graph", count: 2, group: "account" },
  { id: "claimed-offers", label: "Claimed offers", href: "/account/claimed-offers", icon: "ticket", count: 4, group: "account" },
  { id: "referrals", label: "Referrals & rewards", href: "/account/referrals", icon: "gift", group: "account" },
  { id: "notifications", label: "Notifications", href: "/account/notifications", icon: "notification-bing", count: 3, group: "account" },
  { id: "settings", label: "Account settings", href: "/account/settings", icon: "setting", group: "settings" },
];

export const USER = {
  name: "Alex Carter",
  initials: "AC",
  email: "alex.carter@mail.com",
  role: "Trader · Level 3",
};
