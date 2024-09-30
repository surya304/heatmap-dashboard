import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Sidebar from "./components/Sidebar";
import ClickMap from "./components/ClickMap"; // Import ClickMap component
import Contact from "./components/Contact"; // Import Contact component
import About from "./components/About"; // Import About component

export default function Home() {
  const { data: session } = useSession();
  const [timePeriod, setTimePeriod] = useState('lastDay');
  const [error, setError] = useState('');
  const [sidebarData, setSidebarData] = useState({ selectedPage: '', selectedMapType: 'scroll' });

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
          <div className="bg-gray-100 shadow-lg">
            <div className="analytics-dashboard text-black">
              {error && <p className="error text-red-500">{error}</p>}
              <div className="filters mb-4 space-y-4">
                <div className="flex space-x-4 p-4 bg-white">
                  <label className="block mb-2 flex-1">
                    Time Period:
                    <select
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="block w-full mt-1 p-2 rounded"
                      style={{ 'border': '1px solid lightgray' }}
                    >
                      <option value="lastDay">Last Day</option>
                      <option value="lastWeek">Last Week</option>
                      <option value="lastMonth">Last Month</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          
          {/* Conditionally render Contact or About component */}
          {sidebarData.selectedPage === 'contactus' && <Contact  selectedMapType={sidebarData.selectedMapType} />}
          {sidebarData.selectedPage === 'aboutus' && <About selectedMapType={sidebarData.selectedMapType} />}
        </div>
      </div>
    </div>
  );
}