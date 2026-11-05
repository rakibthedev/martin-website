import { AccountLayout } from "@/components/account/AccountLayout";
import { Crumbs } from "@/components/account-pages/shared";
import { NotificationsView } from "@/components/account-pages/notifications/NotificationsView";

export const metadata = { title: "Notifications · PropFirmScores" };

export default function Page() {
  return (
    <AccountLayout active="notifications" breadcrumb={<Crumbs page="Notifications" />}>
      <NotificationsView />
    </AccountLayout>
  );
}
