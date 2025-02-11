import React from 'react';
import { AlertTriangle, Power } from 'lucide-react';

const FloodAlerts = () => {
  // Sample data for demonstration
  const alerts = [
    { id: 1, time: '10:00 AM', location: 'Zone 1', risk: 'high' },
    { id: 2, time: '11:30 AM', location: 'Zone 2', risk: 'medium' },
    { id: 3, time: '01:00 PM', location: 'Zone 3', risk: 'low' },
  ];

  const handleActivatePump = (alertId) => {
    // Logic to activate pump based on alertId
    console.log(`Activating pump for alert ${alertId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Flood Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Alert at {alert.location}</h3>
              <p className="text-sm text-gray-500">Time: {alert.time}</p>
              <p className={`text-sm ${alert.risk === 'high' ? 'text-red-600' : alert.risk === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                Risk Level: {alert.risk.charAt(0).toUpperCase() + alert.risk.slice(1)}
              </p>
            </div>
            <button
              onClick={() => handleActivatePump(alert.id)}
              className="flex items-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
            >
              <Power className="h-5 w-5" />
              <span>Activate Pump</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloodAlerts;
