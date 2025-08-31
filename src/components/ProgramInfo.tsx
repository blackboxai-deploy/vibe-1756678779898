"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProgramInfo() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Program Overview */}
        <div className="text-center mb-12">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm mb-4">
            PROGRAMA OFICIAL DO GOVERNO FEDERAL
          </Badge>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Programa Brasil Saudável
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Iniciativa do Ministério do Desenvolvimento e Assistência Social para garantir 
            acesso à alimentação saudável e fortalecer a produção nacional de alimentos.
          </p>
        </div>

        {/* Key Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">R$ 600</div>
              <p className="text-sm text-gray-600">Valor mensal do benefício</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">2M+</div>
              <p className="text-sm text-gray-600">Famílias beneficiadas</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">27</div>
              <p className="text-sm text-gray-600">Estados participantes</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-sm text-gray-600">Produtos nacionais</p>
            </CardContent>
          </Card>
        </div>

        {/* Legal Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-900">Marco Legal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Decreto nº</span>
                <span className="text-blue-600">11.936/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Portaria MDS</span>
                <span className="text-blue-600">1.247/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Lei de Diretrizes</span>
                <span className="text-blue-600">14.628/2023</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Orçamento</span>
                <span className="text-green-600">R$ 14,4 bi</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-900">Produtos Contemplados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-50 p-2 rounded text-center">🥥 Açaí</div>
                <div className="bg-yellow-50 p-2 rounded text-center">🥭 Manga</div>
                <div className="bg-orange-50 p-2 rounded text-center">🍯 Mel</div>
                <div className="bg-blue-50 p-2 rounded text-center">🌰 Castanha</div>
                <div className="bg-green-50 p-2 rounded text-center">🥥 Água de Coco</div>
                <div className="bg-red-50 p-2 rounded text-center">🍊 Frutas Diversas</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}