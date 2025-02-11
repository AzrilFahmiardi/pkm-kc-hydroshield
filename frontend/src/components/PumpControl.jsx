import React, { useState } from 'react';
import { Power, Thermometer, Gauge } from 'lucide-react';

const PumpControl = () => {
  const [isPumpActive, setIsPumpActive] = useState(false);
  const [mode, setMode] = useState('manual');

  const handleTogglePump = () => {
    setIsPumpActive(!isPumpActive);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pump Control</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pump Status</h3>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-sm text-gray-500">Operational Status</p>
              <p className={`text-lg font-bold ${isPumpActive ? 'text-green-600' : 'text-red-600'}`}>
                {isPumpActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <button
              onClick={handleTogglePump}
              className="flex items-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
            >
              <Power className="h-5 w-5" />
              <span>{isPumpActive ? 'Deactivate' : 'Activate'} Pump</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Operational Details</h3>
          <div className="mt-2 space-y-2 text-sm">
            <p className="text-gray-600">RPM: 1500</p>
            <p className="text-gray-600">Power Usage: 500W</p>
            <p className="text-gray-600">Water Temperature: 25°C</p>
            <p className="text-gray-600">Water Pressure: 2.5 bar</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Operation Mode</h3>
          <div className="mt-2 flex space-x-4">
            <button
              onClick={() => handleModeChange('manual')}
              className={`p-2 rounded-lg ${mode === 'manual' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
            >
              Manual
            </button>
            <button
              onClick={() => handleModeChange('automatic')}
              className={`p-2 rounded-lg ${mode === 'automatic' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
            >
              Automatic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PumpControl;
