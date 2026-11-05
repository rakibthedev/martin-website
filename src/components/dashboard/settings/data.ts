/** Mock data for /account/settings (Figma "Account Settings" 374:2168). */

export type SettingsTabId = "profile" | "security" | "notifications" | "connected" | "privacy";

/** Tabs scroll to the matching section (`target` = element id). */
export const SETTINGS_TABS: { id: SettingsTabId; label: string; target: string }[] = [
  { id: "profile", label: "Profile", target: "settings-profile" },
  { id: "security", label: "Security", target: "settings-security" },
  { id: "notifications", label: "Notifications", target: "settings-notifications" },
  { id: "connected", label: "Connected accounts", target: "settings-security" },
  { id: "privacy", label: "Privacy & data", target: "settings-danger" },
];

export type ProfileForm = {
  fullName: string;
  displayName: string;
  email: string;
  country: string;
  experience: string;
  platform: string;
  markets: string[];
  bio: string;
};

export const INITIAL_PROFILE: ProfileForm = {
  fullName: "Alex Carter",
  displayName: "Alex C.",
  email: "alex.carter@mail.com",
  country: "Bangladesh",
  experience: "3–5 years",
  platform: "MT5",
  markets: ["Forex", "Crypto", "Indices"],
  bio: "Swing trader focused on FX majors. Funded with two firms since 2023. I review payouts, support and rule clarity.",
};

export const MARKETS = ["Forex", "Futures", "Crypto", "Indices", "Stocks", "Commodities"];

export const COUNTRIES = [
  "Bangladesh",
  "India",
  "Pakistan",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Germany",
  "Nigeria",
  "Australia",
];
export const EXPERIENCE = ["Less than 1 year", "1–2 years", "3–5 years", "5–10 years", "10+ years"];
export const PLATFORMS = ["MT4", "MT5", "cTrader", "DXtrade", "TradingView", "NinjaTrader"];

export const BIO_MAX = 240;

export type Preference = { id: string; title: string; description: string; on: boolean };

export const PREFERENCES: Preference[] = [
  {
    id: "review-status",
    title: "Review status updates",
    description: "When a review is verified, published or needs proof",
    on: true,
  },
  { id: "offers", title: "Offers from saved firms", description: "New discounts from firms on your shortlist", on: true },
  { id: "referrals", title: "Referral activity", description: "When someone joins or earns you a reward", on: true },
  { id: "digest", title: "Weekly digest", description: "Top new reviews and trust-score changes", on: false },
  { id: "product", title: "Product news", description: "New features and announcements", on: false },
];

export const PUBLIC_STATS = [
  { value: "6", label: "Reviews" },
  { value: "4.6", label: "Avg. rating" },
  { value: "52", label: "Helpful votes" },
];

export const VERIFICATION_CHECKS: { label: string; done: boolean }[] = [
  { label: "Email verified", done: true },
  { label: "Phone number verified", done: true },
  { label: "Funded account proof", done: false },
];
