
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Scanner from '../components/Scanner';
import Dashboard from '../components/Dashboard';
import { PlateRecord, ScanStats } from '../types';
import { toast } from 'sonner';

const Index = () => {
  // State for scan history
  const [scanRecords, setScanRecords] = useState<PlateRecord[]>([]);
  
  // Stats for the dashboard
  const [stats, setStats] = useState<ScanStats>({
    totalScans: 0,
    uniquePlates: 0,
    todayScans: 0,
    successRate: 80
  });

  // Handle new scan results
  const handleNewScan = (result: PlateRecord) => {
    // Update scan records
    setScanRecords(prev => [result, ...prev]);
    
    // Update stats
    setStats(prev => {
      // Calculate unique plates
      const allPlates = [...scanRecords, result].map(record => record.plateNumber);
      const uniquePlates = new Set(allPlates).size;
      
      // Calculate today's scans
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayScans = [...scanRecords, result].filter(
        record => record.timestamp >= todayStart
      ).length;
      
      return {
        totalScans: prev.totalScans + 1,
        uniquePlates,
        todayScans,
        successRate: Math.round((prev.successRate * prev.totalScans + (result.confidence * 100)) / (prev.totalScans + 1))
      };
    });
    
    // Mostrar notificación toast
    toast.success(`Placa registrada: ${result.plateNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Captura de Placas</h1>
          <p className="text-gray-600">Escanee y reconozca placas de vehículos a través de cámaras</p>
        </div>
        
        <section className="mb-8">
          <Dashboard stats={stats} />
        </section>
        
        <section>
          <Scanner onNewScan={handleNewScan} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
