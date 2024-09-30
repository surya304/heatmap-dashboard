import React from 'react';

const RightSidebar = () => {

    const buttonclass ='bg-white text-purple-500 border border-purple-500 px-4 py-2 rounded mr-4 hover:bg-purple-500 hover:text-white w-full';
  return (
    <div className="w-64 h-[100vh] bg-white shadow-lg" style={{'borderLeft': '1px solid lightgray'}}>
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

export default RightSidebar;