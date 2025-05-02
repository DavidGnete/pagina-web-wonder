
import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-scanner-dark text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Camera className="h-8 w-8 text-scanner-accent" />
          <h1 className="text-2xl font-bold">PlateScanner Pro</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#" className="hover:text-scanner-accent transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-scanner-accent transition-colors">Dashboard</a></li>
            <li><a href="#" className="hover:text-scanner-accent transition-colors">History</a></li>
            <li><a href="#" className="hover:text-scanner-accent transition-colors">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
