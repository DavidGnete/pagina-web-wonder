
export interface PlateRecord {
  id: string;
  plateNumber: string;
  timestamp: Date;
  confidence: number;
  imageUrl?: string;
  location?: string;
}

export interface ScanStats {
  totalScans: number;
  uniquePlates: number;
  todayScans: number;
  successRate: number;
}
