import { signOut, useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Sidebar from "./components/Sidebar";
import ClickMap from "./components/ClickMap"; // Import ClickMap component

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <AnalyticsDashboard />
          <ClickMap /> {/* Include ClickMap component */}
        </div>
      </div>
    </div>
  );
}