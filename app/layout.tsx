import type { Metadata } from "next";
import { Inter, Lilita_One,Poppins, Roboto,Ubuntu } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";

const poppins = Poppins({subsets : ["latin"] , weight: "500", style : ["normal"]})
const inter = Inter({ subsets: ["latin"], weight : "600" });
const lilita = Lilita_One({style : ["normal"],
  weight : "400",
  subsets : ["latin"]
})
const robotos = Roboto({
  subsets: ["latin"],
  weight: "500",
  style: ["normal"],
});
const unbuntu = Ubuntu({subsets : ["latin"] , weight : "700" , style : ["normal"]})
export const metadata: Metadata = {
  title: "Otakulinks",
  description: "Emprunts de manga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={unbuntu.className}>
      <Header/>
        {children}
      </body>
    </html>
  );
}
