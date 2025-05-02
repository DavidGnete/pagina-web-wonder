
import React from 'react';
import { PlateRecord } from '../types';
import { formatConfidence, formatTimestamp } from '../utils/plateUtils';

interface PlateHistoryProps {
  records: PlateRecord[];
}

const PlateHistory: React.FC<PlateHistoryProps> = ({ records }) => {
  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Scan History</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No scan records available yet.</p>
          <p className="text-sm mt-2">Scanned license plates will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Scan History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Plate Number</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Confidence</th>
              <th className="p-3 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr 
                key={record.id} 
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 font-medium">{record.plateNumber}</td>
                <td className="p-3 text-gray-600">{formatTimestamp(record.timestamp)}</td>
                <td className="p-3">
                  <span 
                    className={`px-2 py-1 rounded text-white text-xs ${
                      record.confidence > 0.9 ? 'bg-green-500' : record.confidence > 0.8 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                  >
                    {formatConfidence(record.confidence)}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{record.location || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlateHistory;
