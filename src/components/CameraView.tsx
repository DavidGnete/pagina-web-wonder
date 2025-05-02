
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scanPlateFromImage } from '../utils/plateUtils';
import { toast } from 'sonner';
import { PlateRecord } from '../types';

interface CameraViewProps {
  onScanComplete: (result: PlateRecord | null) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if the browser supports getUserMedia
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setHasCamera(true);
    }
  }, []);

  // Handle activating/deactivating camera
  const toggleCamera = async () => {
    if (!isCameraActive) {
      try {
        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Could not access camera. Please check permissions.');
        setIsCameraActive(false);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setIsCameraActive(false);
      }
    }
  };

  // Handle scanning
  const handleScan = async () => {
    setIsScanning(true);
    
    try {
      // If we have an active video feed, capture an image
      if (isCameraActive && videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert canvas to data URL
          const imageUrl = canvas.toDataURL('image/jpeg');
          
          // Scan the plate
          const result = await scanPlateFromImage(imageUrl);
          onScanComplete(result);
          
          if (result) {
            toast.success(`Plate detected: ${result.plateNumber}`);
          } else {
            toast.error('No license plate detected. Please try again.');
          }
        }
      } else {
        // Mock scan without camera
        const result = await scanPlateFromImage();
        onScanComplete(result);
        
        if (result) {
          toast.success(`Plate detected: ${result.plateNumber}`);
        } else {
          toast.error('No license plate detected. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during scan:', error);
      toast.error('An error occurred during scanning. Please try again.');
      onScanComplete(null);
    }
    
    setIsScanning(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-scanner-dark text-white flex justify-between items-center">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera Feed
        </h2>
        {hasCamera && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleCamera}
            className={`text-white ${isCameraActive ? 'bg-scanner-error hover:bg-scanner-error/90' : 'bg-scanner-accent hover:bg-scanner-accent/90'}`}
          >
            {isCameraActive ? 'Stop Camera' : 'Start Camera'}
          </Button>
        )}
      </div>
      
      <div className="scanner-container bg-gray-900 relative h-[300px]">
        {isCameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-2 opacity-30" />
              <p>{hasCamera ? 'Click "Start Camera" to enable camera feed' : 'Camera not available on this device'}</p>
            </div>
          </div>
        )}
        
        {isScanning && (
          <div className="scanning-line animate-scanning"></div>
        )}
        
        {/* Hidden canvas used for capturing images from video */}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
      
      <div className="p-4 flex justify-center">
        <Button
          onClick={handleScan}
          disabled={isScanning}
          className="bg-scanner-DEFAULT hover:bg-scanner-light text-white gap-2 px-8 py-6 text-lg"
        >
          <Scan className="h-5 w-5" />
          {isScanning ? 'Scanning...' : 'Scan Plate'}
        </Button>
      </div>
    </div>
  );
};

export default CameraView;
