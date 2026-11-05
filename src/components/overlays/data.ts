/** Mock data for the header overlays (Figma 371:554 account menu, 371:649 notifications panel). */

export type AccountMenuItem = {
  label: string;
  href: string;
  /** Iconsax base name; the 18px `-f0f0f0` (active) and `-898587` files exist in /public/icons */
  icon: string;
  meta?: string;
};

export const ACCOUNT_MENU_MAIN: AccountMenuItem[] = [
  { label: "Dashboard", href: "/account", icon: "category-18" },
  { label: "My reviews", href: "/account/reviews", icon: "document-text-18", meta: "7" },
  { label: "Favourite firms", href: "/account/favourites", icon: "heart-18", meta: "3 / 5" },
  { label: "Claimed offers", href: "/account/claimed-offers", icon: "ticket-18" },
  { label: "Referrals & rewards", href: "/account/referrals", icon: "gift-18", meta: "$240" },
];

export const ACCOUNT_MENU_SUPPORT: AccountMenuItem[] = [
  { label: "Account settings", href: "/account/settings", icon: "setting-18" },
  { label: "Help & support", href: "mailto:support@propfirmscores.com", icon: "message-18" },
];

export type NotificationCategory = "reviews" | "offers" | "referrals";

export type NotificationItem = {
  id: string;
  group: "TODAY" | "EARLIER";
  category: NotificationCategory;
  title: string;
  body: string;
  time: string;
  /** full icon file name (18px) */
  icon: string;
  /** icon circle: brand tint (today) or raised (earlier) */
  tone: "brand" | "raised";
  action?: string;
  href: string;
  unread: boolean;
};

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "review-published",
    group: "TODAY",
    category: "reviews",
    title: "Review published",
    body: "Your Aqua Funded review passed verification and is now live.",
    time: "2h",
    icon: "tick-circle-bold-18-00d26a",
    tone: "brand",
    action: "View review",
    href: "/account/reviews",
    unread: true,
  },
  {
    id: "proof-requested",
    group: "TODAY",
    category: "reviews",
    title: "Proof requested",
    body: "Upload a payout screenshot to publish your FundingPips review.",
    time: "5h",
    icon: "danger-18-ff6b6b",
    tone: "brand",
    action: "Add proof",
    href: "/account/reviews",
    unread: true,
  },
  {
    id: "new-offer",
    group: "TODAY",
    category: "offers",
    title: "New offer on your shortlist",
    body: "FundingPips: 20% off all challenges with code PFS-ALEX20.",
    time: "8h",
    icon: "ticket-18-00d26a",
    tone: "brand",
    href: "/offers",
    unread: true,
  },
  {
    id: "referral-joined",
    group: "EARLIER",
    category: "referrals",
    title: "Referral joined",
    body: "Sam R. signed up with your link. $50 pending.",
    time: "3d",
    icon: "people-18-898587",
    tone: "raised",
    href: "/account/referrals",
    unread: false,
  },
  {
    id: "review-helped",
    group: "EARLIER",
    category: "reviews",
    title: "Your review helped 12 traders",
    body: "Blue Guardian review received 12 helpful votes.",
    time: "5d",
    icon: "like-18-898587",
    tone: "raised",
    href: "/account/reviews",
    unread: false,
  },
];

export const NOTIFICATION_TABS: { id: "all" | NotificationCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reviews", label: "Reviews" },
  { id: "offers", label: "Offers" },
  { id: "referrals", label: "Referrals" },
];
