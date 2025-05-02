
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  matricula: string;
  placa: string;
  modelo: string;
  color: string;
}

const ESTUDIANTES_EJEMPLO: Estudiante[] = [
  { id: '1', nombre: 'Ana', apellido: 'García', matricula: 'A12345', placa: 'ABC123', modelo: 'Honda Civic', color: 'Rojo' },
  { id: '2', nombre: 'Carlos', apellido: 'Rodríguez', matricula: 'B67890', placa: 'XYZ789', modelo: 'Toyota Corolla', color: 'Azul' },
  { id: '3', nombre: 'Laura', apellido: 'Martínez', matricula: 'C54321', placa: 'DEF456', modelo: 'Nissan Sentra', color: 'Negro' },
];

const Estudiantes: React.FC = () => {
  const [estudiantes] = React.useState<Estudiante[]>(ESTUDIANTES_EJEMPLO);
  const [busqueda, setBusqueda] = React.useState('');
  
  const estudiantesFiltrados = estudiantes.filter(est => 
    est.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    est.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
    est.matricula.toLowerCase().includes(busqueda.toLowerCase()) ||
    est.placa.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administrar Estudiantes</h1>
          <p className="text-gray-600">Gestione los estudiantes y sus vehículos registrados</p>
        </div>
        
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar por nombre, matrícula o placa..." 
                className="pl-9"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <Button>
              Agregar Estudiante
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border-b">Nombre</th>
                  <th className="text-left p-3 border-b">Matrícula</th>
                  <th className="text-left p-3 border-b">Placa</th>
                  <th className="text-left p-3 border-b">Vehículo</th>
                  <th className="text-center p-3 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantesFiltrados.length > 0 ? (
                  estudiantesFiltrados.map((estudiante) => (
                    <tr key={estudiante.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{estudiante.nombre} {estudiante.apellido}</td>
                      <td className="p-3 border-b">{estudiante.matricula}</td>
                      <td className="p-3 border-b">{estudiante.placa}</td>
                      <td className="p-3 border-b">{estudiante.modelo} ({estudiante.color})</td>
                      <td className="p-3 border-b text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="destructive" size="sm">Eliminar</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      No se encontraron estudiantes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Estudiantes;
