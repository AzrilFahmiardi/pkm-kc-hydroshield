import React, { useState } from 'react';
import { Map, Filter, Droplets, AlertTriangle, Power, Search, Layers, ChevronDown, ChevronUp } from 'lucide-react';

const AreaMap = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);

  // Sample data for demonstration
  const mapData = {
    sensors: [
      { id: 1, name: 'Sensor A1', lat: 10, lng: 20, status: 'active', waterLevel: 2.5 },
      { id: 2, name: 'Sensor B2', lat: 15, lng: 25, status: 'warning', waterLevel: 4.2 },
      { id: 3, name: 'Sensor C3', lat: 12, lng: 22, status: 'critical', waterLevel: 5.1 },
    ],
    floodZones: [
      { id: 1, name: 'Zone 1', riskLevel: 'high', historicalIncidents: 12 },
      { id: 2, name: 'Zone 2', riskLevel: 'medium', historicalIncidents: 5 },
      { id: 3, name: 'Zone 3', riskLevel: 'low', historicalIncidents: 2 },
    ],
    pumps: [
      { id: 1, name: 'Pump Station A', status: 'operational', capacity: '1000m³/h' },
      { id: 2, name: 'Pump Station B', status: 'maintenance', capacity: '800m³/h' },
      { id: 3, name: 'Pump Station C', status: 'operational', capacity: '1200m³/h' },
    ]
  };

  const handleFilterChange = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const renderAreaDetails = () => {
    if (!selectedArea) return null;
    return (
      <div className="absolute bottom-4 left-4 max-w-sm z-10 bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold">{selectedArea.name}</h4>
            <button 
              onClick={() => setSelectedArea(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="mt-2 space-y-2 text-sm">
            <p className="text-gray-600">Risk Level: {selectedArea.riskLevel}</p>
            <p className="text-gray-600">Historical Incidents: {selectedArea.historicalIncidents}</p>
          </div>
        </div>
      </div>
    );
  };

  const FilterSection = ({ title, filters, icon: Icon }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {title}
      </h4>
      <div className="space-y-2">
        {filters.map(({ id, label, value, color }) => (
          <label key={id} className="flex items-center gap-2 text-sm">
            <input 
              type="checkbox"
              checked={activeFilters.includes(value)}
              onChange={() => handleFilterChange(value)}
              className={`rounded ${color}`}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Area Map</h2>
          <p className="text-sm text-gray-500">Interactive map showing HydroShield monitoring system</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Layers className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <button
        className="md:hidden w-full p-4 bg-white rounded-lg shadow-sm flex justify-between items-center"
        onClick={() => setIsFiltersPanelOpen(!isFiltersPanelOpen)}
      >
        <span className="font-medium flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </span>
        {isFiltersPanelOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters Panel */}
        <div className={`
          md:w-64 bg-white rounded-lg shadow-md
          ${isFiltersPanelOpen ? 'block' : 'hidden'}
          md:block
        `}>
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-6">
              <FilterSection
                title="Sensors"
                icon={Droplets}
                filters={[
                  { id: 1, label: 'Active Sensors', value: 'active-sensors', color: 'text-blue-600' },
                  { id: 2, label: 'Warning Status', value: 'warning-sensors', color: 'text-yellow-600' },
                  { id: 3, label: 'Critical Status', value: 'critical-sensors', color: 'text-red-600' },
                ]}
              />

              <FilterSection
                title="Risk Zones"
                icon={AlertTriangle}
                filters={[
                  { id: 1, label: 'High Risk Areas', value: 'high-risk', color: 'text-red-600' },
                  { id: 2, label: 'Medium Risk Areas', value: 'medium-risk', color: 'text-yellow-600' },
                  { id: 3, label: 'Low Risk Areas', value: 'low-risk', color: 'text-green-600' },
                ]}
              />

              <FilterSection
                title="Pump Stations"
                icon={Power}
                filters={[
                  { id: 1, label: 'Operational', value: 'operational-pumps', color: 'text-green-600' },
                  { id: 2, label: 'Under Maintenance', value: 'maintenance-pumps', color: 'text-yellow-600' },
                ]}
              />

              {/* Legend */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span>Water Level Sensor</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span>High Risk Zone</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Power className="h-4 w-4 text-green-600" />
                    <span>Pump Station</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-white rounded-lg shadow-md">
          <div className="relative h-[calc(100vh-12rem)] md:h-[calc(100vh-16rem)]">
            <img 
              src="/api/placeholder/800/600" 
              alt="Map placeholder" 
              className="w-full h-full object-cover rounded-lg"
            />
            {renderAreaDetails()}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 space-y-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <span className="text-xl font-bold">+</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <span className="text-xl font-bold">−</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaMap;