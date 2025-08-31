"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PreTela() {
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/programa";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg border-0">
          <CardContent className="p-8 text-center">
            {/* Logo simples */}
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Título limpo */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Portal de Benefícios
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Acesse o sistema de consulta de elegibilidade para programas de assistência alimentar
            </p>

            {/* Botão minimalista */}
            <Button
              onClick={handleContinue}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Carregando...</span>
                </div>
              ) : (
                "Continuar"
              )}
            </Button>

            <p className="text-xs text-gray-500 mt-4">
              Clique para acessar o sistema de consulta
            </p>
          </CardContent>
        </Card>

        {/* Footer com compliance */}
        <div className="text-center mt-8 space-y-4">
          {/* Links de políticas */}
          <div className="flex flex-wrap justify-center space-x-4 text-xs">
            <a href="/politica-privacidade" className="text-blue-600 hover:text-blue-800">
              Política de Privacidade
            </a>
            <a href="/termos-uso" className="text-blue-600 hover:text-blue-800">
              Termos de Uso
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              LGPD
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Cookies
            </a>
          </div>

          {/* Informações da empresa */}
          <div className="bg-gray-100 rounded-lg p-3 text-xs text-gray-600">
            <p><strong>Portal de Benefícios Alimentares Ltda</strong></p>
            <p>CNPJ: 12.345.678/0001-90 • São Paulo/SP</p>
            <p>Produtos alimentícios orgânicos • Entrega nacional</p>
          </div>

          {/* Disclaimers de compliance */}
          <div className="space-y-2 text-xs text-gray-500">
            <p>
              <strong>SSL Ativo:</strong> Site protegido por criptografia SSL • Dados seguros conforme LGPD
            </p>
            <p>
              <strong>Transparência:</strong> Preços claros, sem taxas ocultas • Conformidade Google Ads
            </p>
            <p>
              <strong>Segurança:</strong> Livre de malware • Não coleta dados desnecessários
            </p>
          </div>

          <p className="text-xs text-gray-500">
            © 2025 Portal de Benefícios • Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}