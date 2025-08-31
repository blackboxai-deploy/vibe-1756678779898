"use client";

import { Button } from "@/components/ui/button";

export function OfficialHeader() {
  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-blue-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Acessibilidade</a>
            <a href="#" className="hover:underline">Alto Contraste</a>
            <a href="#" className="hover:underline">Mapa do Site</a>
          </div>
          <div className="flex space-x-4">
            <span>Governo Federal</span>
            <span>|</span>
            <span>gov.br</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png"
                alt="Logo Gov.br"
                className="h-16"
              />
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-lg font-medium text-blue-900">
                  Ministério do Desenvolvimento<br />
                  e Assistência Social
                </h1>
                <p className="text-sm text-gray-600">Governo Federal</p>
              </div>
            </div>
            <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
              Entrar com gov.br
            </Button>
          </div>

          {/* Navigation */}
          <nav className="border-t border-gray-200 pt-4">
            <div className="flex space-x-8">
              <a href="#" className="text-blue-900 font-medium hover:underline">
                Início
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 hover:underline">
                O Programa
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 hover:underline">
                Como Participar
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 hover:underline">
                Transparência
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 hover:underline">
                Notícias
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 hover:underline">
                Contato
              </a>
            </div>
          </nav>
        </div>
        
        {/* Brazilian Flag Colors Bar */}
        <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500"></div>
      </header>
    </>
  );
}