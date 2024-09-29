import { signOut, useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-oswald ">
      <Navbar /> 
      <AnalyticsDashboard />
    </div>
  );
}