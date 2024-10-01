import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Contact from "./components/Contact"; // Import Contact component
import About from "./components/About"; // Import About component

export default function Home() {
  const { data: session } = useSession();
  const [timePeriod, setTimePeriod] = useState('lastDay');
  const [error, setError] = useState('');
  const [sidebarData, setSidebarData] = useState({ selectedPage: '', selectedMapType: 'scroll', finalData: '' });

  const handleSidebarSubmit = (data) => {
    console.log(data, 'handleSidebarSubmit');
    
    setSidebarData(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onSubmit={handleSidebarSubmit} />
        <div className="flex-1">
       
          
          
          {/* Conditionally render Contact or About component */}
          {sidebarData.selectedPage === 'contactus' && <Contact  selectedMapType={sidebarData.selectedMapType} finalData={sidebarData.finalData} />}
          {sidebarData.selectedPage === 'aboutus' && <About selectedMapType={sidebarData.selectedMapType} finalData={sidebarData.finalData} />}
        </div>
      </div>
    </div>
  );
}