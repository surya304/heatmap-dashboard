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
    if (data.error) {
      setError(data.error);
      return;
    }else{
      setError('');
    }
    
    console.log(data, 'handleSidebarSubmit');
    setSidebarData(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onSubmit={handleSidebarSubmit} />
        <div className="flex-1">
       
        {error && (
            <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4">
              {error}
            </div>
          )}
          
          
          {/* Conditionally render Contact or About component */}
          {sidebarData.selectedPage === 'contactus' && <Contact  selectedMapType={sidebarData.selectedMapType} finalData={sidebarData.finalData} />}
          {sidebarData.selectedPage === 'aboutus' && <About selectedMapType={sidebarData.selectedMapType} finalData={sidebarData.finalData} />}
        </div>
      </div>
    </div>
  );
}