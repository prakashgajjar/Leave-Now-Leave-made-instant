import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Leave Now - Home page",
  description: "Gec patan hostel leave managment system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Navbar/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <Footer/>
    </html>
  );
}
