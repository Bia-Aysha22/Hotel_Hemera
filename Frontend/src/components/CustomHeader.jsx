import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const CustomHeader = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-hemera-navy-900/95 backdrop-blur border-b border-aurum-500">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-aurum-300 via-aurum-400 to-aurum-500 shadow-md" />
          <span className="font-logo text-xl md:text-2xl text-aurum-400">Hotel Hemera</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-hemera-blue-100 hover:text-aurum-400 transition-colors">Início</Link>
          <a href="#rooms" className="text-hemera-blue-100 hover:text-aurum-400 transition-colors">Suítes</a>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-hemera-blue-100 hover:text-aurum-400 transition-colors">Dashboard</Link>
              <Link to="/users" className="text-hemera-blue-100 hover:text-aurum-400 transition-colors">Usuários</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-hemera-blue-100 hover:text-aurum-400 transition-colors">Entrar</Link>
              <Link to="/register" className="text-hemera-blue-900 bg-aurum-400 hover:bg-aurum-500 text-hemera-navy-900 px-4 py-2 rounded-sm transition-colors">Criar conta</Link>
            </>
          )}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-sm text-aurum-400 hover:bg-hemera-blue-800"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hemera-blue-800 bg-hemera-navy-900">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-hemera-blue-100">Início</Link>
            <a href="#rooms" className="block text-hemera-blue-100">Suítes</a>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block text-hemera-blue-100">Dashboard</Link>
                <Link to="/users" className="block text-hemera-blue-100">Usuários</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-hemera-blue-100">Entrar</Link>
                <Link to="/register" className="inline-flex items-center gap-2 text-hemera-navy-900 bg-aurum-400 hover:bg-aurum-500 px-3 py-2 rounded-sm">Criar conta</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomHeader;

