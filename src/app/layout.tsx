import { TeamsProvider } from "@/contexts/TeamsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TeamsProvider>{children}</TeamsProvider>
      </body>
    </html>
  );
}
