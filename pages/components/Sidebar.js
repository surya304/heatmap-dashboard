import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ onSubmit }) => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedMapType, setSelectedMapType] = useState('scroll');
  const [timePeriod, setTimePeriod] = useState('lastDay');

  const handleSubmit = () => {
    if (!selectedPage || !selectedMapType || !timePeriod) {
      onSubmit({ error: 'Please select all options before submitting.' });
      return;
    }else{
      onSubmit({ error: '' });
    }
  
    let finalData;
    console.log(timePeriod, 'timePeriod');
    
    if (timePeriod === 'lastDay') {
      if (selectedMapType === 'scroll') {
        finalData = [22, 33, 44, 55];
      } else if (selectedMapType === 'allClicks') {
          finalData = {
          max: 1,
          data: [
            { x: 564, y: 292.8, value: 1 },
            { x: 479, y: 431.6, value: 1 },
            { x: 445, y: 226.6, value: 1 },
            { x: 460, y: 139.6, value: 1 },
            { x: 156, y: 210.6, value: 1 },
          ],
        };
      }
    } else if (timePeriod === 'lastWeek') {
      if (selectedMapType === 'scroll') {
        finalData = [50, 50];
      } else if (selectedMapType === 'allClicks') {
        finalData = {
          max: 1,
          data: [
            { x: 110, y: 210, value: 1 },
            { x: 160, y: 260, value: 1 },
            { x: 210, y: 310, value: 1 },
            { x: 260, y: 360, value: 1 },
            { x: 310, y: 410, value: 1 },
          ],
        };
      }
    } else if (timePeriod === 'lastMonth') {
      if (selectedMapType === 'scroll') {
        finalData = [20, 30, 40, 50];
      } else if (selectedMapType === 'allClicks') {
        finalData = {
          max: 1,
          data: [
            { x: 564, y: 292.8, value: 1 },
            { x: 479, y: 431.6, value: 1 },
            { x: 445, y: 226.6, value: 1 },
            { x: 460, y: 139.6, value: 1 },
            { x: 156, y: 210.6, value: 1 },
          ],
        };
      }
    }
    
    onSubmit({ selectedPage, selectedMapType, finalData });
  };

  return (
    <div className="w-64 h-[100vh] bg-white shadow-lg text-black" style={{ 'borderRight': '1px solid lightgray' }}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-black">Select Page</h2>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="block w-full mt-1 p-2 rounded border border-gray-300"
        >
          <option value="">Select a page</option>
          <option value="aboutus">About Us</option>
          <option value="contactus">Contact Us</option>
        </select>

        <h2 className="text-lg font-semibold text-black mt-4">Map Types</h2>
        <ul className="list-none p-4">
          <li className="mb-4">
            <input
              type="radio"
              id="allClicks"
              name="clickOptions"
              value="allClicks"
              checked={selectedMapType === 'allClicks'}
              onChange={(e) => setSelectedMapType(e.target.value)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <label htmlFor="allClicks" className="ml-2 text-gray-700">ALL Clicks</label>
          </li>
          <li className="mb-4">
            <input
              type="radio"
              id="scroll"
              name="clickOptions"
              value="scroll"
              checked={selectedMapType === 'scroll'}
              onChange={(e) => setSelectedMapType(e.target.value)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <label htmlFor="scroll" className="ml-2 text-gray-700">Scroll</label>
          </li>
        </ul>

        <div className="bg-gray-100 shadow-lg">
          <div className="analytics-dashboard text-black">
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

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Sidebar;