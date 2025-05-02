
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-scanner-dark text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Sistema Inteligente de Acceso Vehicular. Todos los derechos reservados.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Tecnología de escaneo de placas para gestión de acceso y seguridad.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
