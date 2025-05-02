
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-scanner-dark text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} PlateScanner Pro. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          License plate scanning technology for security and parking management.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
