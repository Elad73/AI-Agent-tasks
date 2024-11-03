'use client';
import { useState, useEffect } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');

  const handleSearch = async () => {
    setIsSearching(true);
    setResults([]);
    setProgress(0);
    
    try {
      // Start the search
      const searchResponse = await fetch('http://localhost:8000/api/v1/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern: searchTerm }),
      });

      if (!searchResponse.ok) {
        throw new Error('Search failed');
      }

      // Start polling for status
      const statusInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch('http://localhost:8000/api/v1/search/status');
          const statusData = await statusResponse.json();
          
          console.log('Status update:', statusData);  // Debug log
          
          setProgress(statusData.progress || 0);
          setCurrentLocation(statusData.current_location || '');
          setResults(statusData.files_found || []);

          if (!statusData.is_searching) {
            clearInterval(statusInterval);
            setIsSearching(false);
          }
        } catch (error) {
          console.error('Status check failed:', error);
          clearInterval(statusInterval);
          setIsSearching(false);
        }
      }, 1000);

    } catch (error) {
      console.error('Search failed:', error);
      setIsSearching(false);
    }
  };

  const handleStopSearch = async () => {
    await fetch('http://localhost:8000/api/v1/search/stop', { method: 'POST' });
    setIsSearching(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">File Search Agent</h1>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter file name or pattern..."
          />
          {isSearching ? (
            <button
              onClick={handleStopSearch}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Search
            </button>
          )}
        </div>

        {isSearching && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm text-gray-600">
              <span>Searching: {currentLocation}</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {results.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {results.map((file, index) => (
                <li key={index} className="px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {file}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">
            {isSearching ? 'Searching...' : 'No files found'}
          </div>
        )}
      </div>
    </div>
  );
}
