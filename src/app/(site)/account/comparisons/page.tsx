import { AccountLayout } from "@/components/account/AccountLayout";
import { Crumbs } from "@/components/account-pages/shared";
import { ComparisonsView } from "@/components/account-pages/comparisons/ComparisonsView";

export const metadata = { title: "Comparisons · PropFirmScores" };

export default function Page() {
  return (
    <AccountLayout active="comparisons" breadcrumb={<Crumbs page="Comparisons" />}>
      <ComparisonsView />
    </AccountLayout>
  );
}
