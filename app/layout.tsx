// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Suivi des Habitudes",
  description: "Application de suivi des habitudes et des séries",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen transition-colors">
        {children}
      </body>
    </html>
  );
}
