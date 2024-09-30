import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Sidebar = ({ onSubmit }) => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedMapType, setSelectedMapType] = useState('scroll');

  const handleSubmit = () => {
    onSubmit({ selectedPage, selectedMapType });
  };

  return (
    <div className="w-64 h-[100vh] bg-white shadow-lg text-black" style={{'borderRight': '1px solid lightgray'}}>
    

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