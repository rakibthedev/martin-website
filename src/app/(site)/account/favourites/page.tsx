import { AccountLayout } from "@/components/account/AccountLayout";
import { Crumbs } from "@/components/account-pages/shared";
import { FavouritesView } from "@/components/account-pages/favourites/FavouritesView";

export const metadata = { title: "Favourite firms · PropFirmScores" };

export default function Page() {
  return (
    <AccountLayout active="favourites" breadcrumb={<Crumbs page="Favourite firms" />}>
      <FavouritesView />
    </AccountLayout>
  );
}
