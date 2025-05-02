
import React from 'react';
import { Camera, History, FilePen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-scanner-dark text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Camera className="h-8 w-8 text-scanner-accent" />
          <h1 className="text-2xl font-bold">Sistema Inteligente de Acceso Vehicular</h1>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <li>
              <Link to="/" className="flex items-center gap-1 hover:text-scanner-accent transition-colors">
                <Camera size={18} />
                <span>Captura de Placa</span>
              </Link>
            </li>
            <li>
              <Link to="/historial" className="flex items-center gap-1 hover:text-scanner-accent transition-colors">
                <History size={18} />
                <span>Ver Historial</span>
              </Link>
            </li>
            <li>
              <Link to="/registro" className="flex items-center gap-1 hover:text-scanner-accent transition-colors">
                <FilePen size={18} />
                <span>Registro Manual</span>
              </Link>
            </li>
            <li>
              <Link to="/estudiantes" className="flex items-center gap-1 hover:text-scanner-accent transition-colors">
                <Users size={18} />
                <span>Administrar Estudiantes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
