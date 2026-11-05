import { AccountLayout } from "@/components/account/AccountLayout";
import { Crumbs } from "@/components/account-pages/shared";
import { ClaimedOffersView } from "@/components/account-pages/claimed-offers/ClaimedOffersView";

export const metadata = { title: "Claimed offers · PropFirmScores" };

export default function Page() {
  return (
    <AccountLayout active="claimed-offers" breadcrumb={<Crumbs page="Claimed offers" />}>
      <ClaimedOffersView />
    </AccountLayout>
  );
}
