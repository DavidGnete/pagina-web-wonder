
// This is a mock utility for license plate scanning
// In a real application, this would connect to a computer vision API or library
import { PlateRecord } from '../types';

// Mock database of plates for demo purposes
const MOCK_PLATES = [
  'ABC123',
  'XYZ789',
  '123DEF',
  'GHI456',
  'JKL789',
  'MNO321',
  'PQR654',
  '987STU',
  'VWX345',
  'YZA678'
];

// Generate a random plate from mock DB
const getRandomPlate = (): string => {
  return MOCK_PLATES[Math.floor(Math.random() * MOCK_PLATES.length)];
};

// Simulates a delay that would occur during real image processing
const simulateProcessingDelay = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 1500));
};

// Mock function to simulate scanning a license plate from an image
export const scanPlateFromImage = async (imageUrl?: string): Promise<PlateRecord | null> => {
  // Simulate processing delay
  await simulateProcessingDelay();
  
  // 80% chance of successful scan for demo purposes
  const success = Math.random() < 0.8;
  
  if (!success) {
    return null;
  }
  
  // Generate a random plate and confidence score
  const plateNumber = getRandomPlate();
  const confidence = 0.7 + (Math.random() * 0.3); // Between 70% and 100%
  
  return {
    id: `scan_${Date.now()}`,
    plateNumber,
    timestamp: new Date(),
    confidence,
    imageUrl: imageUrl || 'https://via.placeholder.com/400x200?text=License+Plate+Image',
    location: 'Main Entrance'
  };
};

// Format confidence as percentage
export const formatConfidence = (confidence: number): string => {
  return `${Math.round(confidence * 100)}%`;
};

// Format timestamp to readable format
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};
