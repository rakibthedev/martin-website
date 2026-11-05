import { AccountLayout } from "@/components/account/AccountLayout";
import { Crumbs } from "@/components/account-pages/shared";
import { ReferralsView } from "@/components/account-pages/referrals/ReferralsView";

export const metadata = { title: "Referrals & rewards · PropFirmScores" };

export default function Page() {
  return (
    <AccountLayout active="referrals" breadcrumb={<Crumbs page="Referrals & rewards" />}>
      <ReferralsView />
    </AccountLayout>
  );
}
