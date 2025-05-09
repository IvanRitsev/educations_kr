import "../styles/globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Учебные дисциплины",
  description: "Список учебных дисциплин",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
