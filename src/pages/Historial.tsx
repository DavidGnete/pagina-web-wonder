
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlateHistory from '../components/PlateHistory';
import { PlateRecord } from '../types';

const Historial: React.FC = () => {
  const [scanRecords] = useState<PlateRecord[]>([]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Historial de Accesos</h1>
          <p className="text-gray-600">Registro histórico de los vehículos escaneados</p>
        </div>
        
        <section>
          <PlateHistory records={scanRecords} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Historial;
