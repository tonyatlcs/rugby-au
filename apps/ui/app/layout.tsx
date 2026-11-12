import type { Metadata } from "next";
import "@/styles/globals.scss";
import { ModalManagerProvider } from "@/providers/Modal";

export const metadata: Metadata = {
  title: "Rugby AU",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ModalManagerProvider>{children}</ModalManagerProvider>
      </body>
    </html>
  );
}
