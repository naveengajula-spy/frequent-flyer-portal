import React, { useState } from 'react';

export default function FrequentFlyerPortal() {
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'Alice Smith', flightNumber: 'DL-441', miles: 45000 }
  ]);
  const [name, setName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [miles, setMiles] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // XSS Sanitization helper
  const sanitize = (str) => str.replace(/[&<>"']/g, '');

  const handleAddPassenger = (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (!name.trim() || !flightNumber.trim() || !miles.trim()) {
      setError('Error: All fields are required!');
      return;
    }

    if (isNaN(miles) || Number(miles) < 0) {
      setError('Error: Accumulated miles must be a valid positive number!');
      return;
    }

    // Simulate network loading state
    setIsLoading(true);

    setTimeout(() => {
      const newPassenger = {
        id: Date.now(),
        name: sanitize(name.trim()),
        flightNumber: sanitize(flightNumber.trim().toUpperCase()),
        miles: parseInt(miles, 10)
      };

      setPassengers((prev) => [...prev, newPassenger]);
      setName('');
      setFlightNumber('');
      setMiles('');
      setIsLoading(false);
    }, 600); // 600ms network delay simulation
  };

  const filteredPassengers = passengers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.flightNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Frequent Flyer Portal</h1>
          <p className="text-sm text-gray-500">Manage corporate traveler accounts and telemetry logs.</p>
        </header>

        {/* Validation Error Alert */}
        {error && (
          <div role="alert" className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-medium">
            {error}
          </div>
        )}

        {/* Add Passenger Form */}
        <form onSubmit={handleAddPassenger} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Passenger Name
            </label>
            <input
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Flight Number
            </label>
            <input
              type="text"
              placeholder="e.g. AA-102"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Accumulated Miles
            </label>
            <input
              type="number"
              placeholder="e.g. 15000"
              value={miles}
              onChange={(e) => setMiles(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-medium py-2 px-4 rounded text-sm hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Processing...' : 'Add Passenger'}
            </button>
          </div>
        </form>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search passenger or flight..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Loading Indicator or Table */}
        {isLoading && (
          <div className="text-center py-4 text-sm font-medium text-gray-500 animate-pulse">
            Loading telemetry & updating logs...
          </div>
        )}

        {/* Passenger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 font-semibold text-gray-700">PASSENGER NAME</th>
                <th className="p-3 font-semibold text-gray-700">FLIGHT NUMBER</th>
                <th className="p-3 font-semibold text-gray-700">ACCUMULATED MILES</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.length > 0 ? (
                filteredPassengers.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{p.name}</td>
                    <td className="p-3 text-gray-600">{p.flightNumber}</td>
                    <td className="p-3 text-gray-600">{p.miles}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No matching traveler records found.
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