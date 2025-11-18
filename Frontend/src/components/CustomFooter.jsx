import React from 'react';

const CustomFooter = () => {
  return (
    <footer className="bg-hemera-navy-900 border-t border-aurum-500/60 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="font-logo text-2xl text-aurum-400 mb-2">Hotel Hemera</h3>
          <p className="text-hemera-blue-200 mb-1">Onde a luz encontra o conforto</p>
          <p className="text-hemera-blue-300 text-sm mb-6">Av. da Serenidade, 1000 • contato@hemera.com</p>
          <p className="text-aurum-500 text-xs">© 2025 Hotel Hemera. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;

