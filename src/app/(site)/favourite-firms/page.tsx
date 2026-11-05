import type { Metadata } from "next";
import { FavouritesView } from "@/components/insights/favourites/FavouritesView";
import { Breadcrumb } from "@/components/insights/ui";

export const metadata: Metadata = { title: "Favourite firms · PropFirmScores" };

/** Figma: Favourite Firms / Desktop 1920 (379:17581), Tablet 768 (497:52173), Mobile 393 (497:52588). */
export default function FavouriteFirmsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 pt-8 md:gap-8 md:px-6 md:pb-12 xl:gap-10 xl:px-12 xl:pb-24">
      <Breadcrumb current="Favourite Firms" />
      <FavouritesView />
    </div>
  );
}
