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
    <div className="analytics-dashboard p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      {error && <p className="error text-red-500">{error}</p>}
      <div className="filters mb-4 space-y-4">
        <div className="flex space-x-4">
          <label className="block mb-2 flex-1">
            Time Period:
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="block w-full mt-1 p-2 rounded shadow-lg"
            >
              <option value="lastDay">Last Day</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </label>
          <label className="block mb-2 flex-1">
            Page:
            <select
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="block w-full mt-1 p-2 rounded shadow-lg"
            >
              <option value="/">Home</option>
              <option value="/about">About</option>
              <option value="/contact">Contact</option>
            </select>
          </label>
        </div>
        <div className="flex space-x-4">
          <label className="block mb-2 flex-1">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full mt-1 p-2 rounded shadow-lg"
            />
          </label>
          <label className="block mb-2 flex-1">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full mt-1 p-2 rounded shadow-lg"
            />
          </label>
        </div>
      </div>
      <div className="analytics-data bg-white p-4 rounded shadow">
        {analyticsData.map((data, index) => (
          <div key={index} className="mb-2">
            <p className="text-lg">
              <span className="font-semibold">{data.metric}:</span> {data.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;