
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 pt-20">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};

export default MainLayout;
