
import React, { useState } from 'react';
import { PlateRecord } from '../types';
import CameraView from './CameraView';

interface ScannerProps {
  onNewScan: (result: PlateRecord) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onNewScan }) => {
  const [latestResult, setLatestResult] = useState<PlateRecord | null>(null);

  const handleScanComplete = (result: PlateRecord | null) => {
    setLatestResult(result);
    if (result) {
      onNewScan(result);
    }
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CameraView onScanComplete={handleScanComplete} />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
            
            {latestResult ? (
              <div className="space-y-4">
                <div className="plate-result text-center">
                  {latestResult.plateNumber}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium">{Math.round(latestResult.confidence * 100)}%</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{latestResult.location || 'Unknown'}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Timestamp:</span>
                    <span className="font-medium">{latestResult.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
                
                {latestResult.imageUrl && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">Captured image:</p>
                    <img 
                      src={latestResult.imageUrl} 
                      alt="License plate" 
                      className="w-full h-auto rounded border border-gray-200" 
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-gray-500">
                <div>
                  <p>No scan results yet</p>
                  <p className="text-sm mt-1">Click "Scan Plate" to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
