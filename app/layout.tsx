import { fonts } from "@/app/fonts";
import Providers from "./providers";
import Header from "./header";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  metadataBase: new URL("https://meal-with-me.vercel.app/"),
  title: "MealWithMe",
  description: "A simple app that makes it easier to grab a meal with a close friend.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts.inter.variable}>
      <body id="body-custom">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
