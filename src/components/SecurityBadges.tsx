export function SecurityBadges() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-center mb-4 text-gray-800">
        Site Oficial e Seguro
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {/* SSL Certificate */}
        <div className="flex items-center space-x-2 text-green-600">
          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="text-sm font-medium">SSL Certificado</span>
        </div>
        
        {/* Government Seal */}
        <div className="flex items-center space-x-2 text-blue-600">
          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🏛</span>
          </div>
          <span className="text-sm font-medium">Portal Oficial</span>
        </div>
        
        {/* LGPD Compliance */}
        <div className="flex items-center space-x-2 text-purple-600">
          <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🔒</span>
          </div>
          <span className="text-sm font-medium">LGPD Compliance</span>
        </div>
        
        {/* 24/7 Support */}
        <div className="flex items-center space-x-2 text-orange-600">
          <div className="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📞</span>
          </div>
          <span className="text-sm font-medium">Suporte 24/7</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Este site é mantido pelo Governo Federal e segue todos os protocolos de segurança.
        </p>
      </div>
    </div>
  );
}