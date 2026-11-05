import type { Metadata } from "next";
import Link from "next/link";
import { AccountLayout } from "@/components/account/AccountLayout";
import { AccountSettings } from "@/components/dashboard/settings/AccountSettings";
import { Crumb } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Account settings · PropFirmScores" };

export default function Page() {
  return (
    <AccountLayout
      active="settings"
      breadcrumb={
        <>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <Crumb>{"  /  "}</Crumb>
          <Link href="/account" className="hover:text-ink">
            Dashboard
          </Link>
          <Crumb>{"  /  Account settings"}</Crumb>
        </>
      }
    >
      <AccountSettings />
    </AccountLayout>
  );
}
