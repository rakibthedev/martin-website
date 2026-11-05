import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShellUIProvider } from "./ShellUI";

/** Signed-in page frame: Header / PropFirmScores / Signed in + page content + Footer. Max design width 1920. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ShellUIProvider>
      <div className="mx-auto flex min-h-dvh w-full max-w-[1920px] flex-col bg-page">
        <Header />
        <main className="flex w-full flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </ShellUIProvider>
  );
}
