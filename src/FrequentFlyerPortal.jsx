import React, { useState, useEffect } from 'react';

export default function FrequentFlyerPortal() {
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'Alice Smith', flight: 'DL-441', miles: '45000' }
  ]);
  const [name, setName] = useState('');
  const [flight, setFlight] = useState('');
  const [miles, setMiles] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);

  // Simulated telemetry
  useEffect(() => {
    console.log('[Analytics] User interacted with End-to-End Frequent Flyer Portal');
  }, []);

  const sanitizeInput = (str) => {
    // Strip out script tags completely, then remove remaining HTML tags
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>?/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleAddPassenger = (e) => {
    e.preventDefault();
    if (!name.trim() || !flight.trim() || !miles.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const cleanName = sanitizeInput(name);
    const cleanFlight = sanitizeInput(flight);
    const cleanMiles = sanitizeInput(miles);

    const newPassenger = {
      id: Date.now(),
      name: cleanName,
      flight: cleanFlight,
      miles: cleanMiles
    };

    setPassengers([newPassenger, ...passengers]);
    setName('');
    setFlight('');
    setMiles('');
  };

  const filteredPassengers = passengers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.flight.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-none shadow-sm p-8">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Frequent Flyer Portal
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage corporate traveler accounts and telemetry logs.
          </p>
        </header>

        {/* Add Passenger Form */}
        <form onSubmit={handleAddPassenger} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label htmlFor="passengerName" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Passenger Name
            </label>
            <input
              id="passengerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border bg-white text-sm focus:outline-none focus:ring-1 ${
                error && !name.trim() ? 'border-red-600 focus:ring-red-600' : 'border-gray-300 focus:ring-gray-900'
              }`}
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div>
            <label htmlFor="flightNumber" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Flight Number
            </label>
            <input
              id="flightNumber"
              type="text"
              value={flight}
              onChange={(e) => setFlight(e.target.value)}
              className={`w-full p-2 border bg-white text-sm focus:outline-none focus:ring-1 ${
                error && !flight.trim() ? 'border-red-600 focus:ring-red-600' : 'border-gray-300 focus:ring-gray-900'
              }`}
              placeholder="e.g. AA-102"
            />
          </div>

          <div>
            <label htmlFor="accumulatedMiles" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Accumulated Miles
            </label>
            <input
              id="accumulatedMiles"
              type="number"
              value={miles}
              onChange={(e) => setMiles(e.target.value)}
              className={`w-full p-2 border bg-white text-sm focus:outline-none focus:ring-1 ${
                error && !miles.trim() ? 'border-red-600 focus:ring-red-600' : 'border-gray-300 focus:ring-gray-900'
              }`}
              placeholder="e.g. 15000"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm py-2 px-4 transition-colors"
            >
              Add Passenger
            </button>
          </div>
        </form>

        {/* Search Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search passenger or flight..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Passenger Table */}
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-700">
                <th className="p-3">Passenger Name</th>
                <th className="p-3">Flight Number</th>
                <th className="p-3">Accumulated Miles</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.length > 0 ? (
                filteredPassengers.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{p.name}</td>
                    <td className="p-3 text-gray-600">{p.flight}</td>
                    <td className="p-3 text-gray-600">{p.miles}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500 italic">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}