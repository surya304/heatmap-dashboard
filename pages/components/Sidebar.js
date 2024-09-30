import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const buttonclass ='bg-white text-purple-500 border border-purple-500 px-4 py-2 rounded mr-4 hover:bg-purple-500 hover:text-white w-full';

  return (
    <div className="w-64 h-[100vh] bg-white shadow-lg" style={{'borderRight': '1px solid lightgray'}}>
      <ul className="list-none p-4">
        <li className="mb-4 text-black group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
ALL pages

</li>   
        <li className="mb-4">
          <button
            onClick={() => router.push('/aboutus')}
            className="text-black group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
          >
            About Us
          </button>
        </li>
        <li className="mb-4 group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
          <button
            onClick={() => router.push('/contactus')}
            className="text-black "
          >
            Contact Us
          </button>
        </li>
        <li className="mb-4 group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
          <button
            onClick={() => router.push('/services')}
            className="text-black "
          >
            Services
          </button>
        </li>
        <li className="mb-4 group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
          <button
            onClick={() => router.push('/faq')}
            className="text-black "
          >
            FAQ
          </button>
        </li>
      </ul>

      <h2 className="text-lg font-semibold p-4 text-black">Map Types</h2>
      <ul className="list-none p-4">
        <li className="mb-4">
          <button className={buttonclass}>
            ALL Clicks
          </button>
        </li>
        <li className="mb-4">
          <button className={buttonclass}>
            Scroll 
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;