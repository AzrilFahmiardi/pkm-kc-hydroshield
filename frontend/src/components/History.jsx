import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const History = () => {
  // Sample data for demonstration
  const activityLog = [
    { id: 1, time: '10:00 AM', activity: 'Pump activated', details: 'Pump 1 activated manually' },
    { id: 2, time: '11:30 AM', activity: 'Sensor status', details: 'Sensor A1 status: normal' },
    { id: 3, time: '01:00 PM', activity: 'Rainfall data', details: 'Rainfall: 20mm' },
  ];

  const waterLevelTrend = [
    { time: '00:00', level: 2.5 },
    { time: '04:00', level: 3.2 },
    { time: '08:00', level: 4.1 },
    { time: '12:00', level: 3.8 },
    { time: '16:00', level: 3.0 },
    { time: '20:00', level: 2.8 },
  ];

  const handleDownloadReport = () => {
    // Logic to download report
    console.log('Downloading report...');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Activity Log</h3>
          <ul className="mt-2 space-y-2">
            {activityLog.map((log) => (
              <li key={log.id} className="text-sm text-gray-600">
                <strong>{log.time}:</strong> {log.activity} - {log.details}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Water Level Trend</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterLevelTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="level" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <h3 className="text-lg font-semibold">Download Report</h3>
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            <Download className="h-5 w-5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
