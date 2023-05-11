import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts: React.FC = () => {
  const [data, setData] = useState<{ date: string, count: number }[]>([]);
  const casesHistory = {
    "cases": {
      "1/22/20": 557,
      "1/23/20": 657,
      "1/24/20": 944,
      "1/25/20": 1437,
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      // console.log(result)
      const chartData = Object.entries(casesHistory.cases).map(([date, count]) => ({
        date,
        count,
      }));

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      {/* <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default Charts;
