import { fonts } from "@/app/fonts";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://meal-with-me.vercel.app/"),
  title: "MealWithMe",
  description: "A simple app that makes it easier to grab a meal with a close friend.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts.inter.variable}>
      <body id="body-custom">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
