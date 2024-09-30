import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('lastDay');
  const [page, setPage] = useState('/');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timePeriod, page, startDate, endDate]);

  const fetchAnalyticsData = async () => {
    // Mock data
    const mockData = [
      { metric: 'Page Views', value: 100 },
      { metric: 'Unique Visitors', value: 50 },
      { metric: 'Bounce Rate', value: '30%' },
      { metric: 'Average Time Spent', value: '2m 30s' },
    ];
    setAnalyticsData(mockData);
  };

  return (
  <div className=" bg-gray-100 shadow-lg"> 
    <div className="analytics-dashboard  text-black ">
      {error && <p className="error text-red-500">{error}</p>}
      <div className="filters mb-4 space-y-4">
        <div className="flex space-x-4 p-4 bg-white">
          <label className="block mb-2 flex-1">
            Time Period:
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="block w-full mt-1 p-2 rounded " style={{'border': '1px solid lightgray'}}
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

  );
};

export default AnalyticsDashboard;