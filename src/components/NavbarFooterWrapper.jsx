"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NavbarFooterWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin"); // Adjust the path as needed

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
}
