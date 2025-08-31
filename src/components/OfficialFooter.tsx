export function OfficialFooter() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Program Info */}
          <div>
            <h3 className="font-semibold mb-4">Programa Brasil Saudável</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Sobre o Programa</a></li>
              <li><a href="#" className="hover:underline">Como Funciona</a></li>
              <li><a href="#" className="hover:underline">Quem Pode Participar</a></li>
              <li><a href="#" className="hover:underline">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Consultar Benefício</a></li>
              <li><a href="#" className="hover:underline">Acompanhar Solicitação</a></li>
              <li><a href="#" className="hover:underline">Atualizar Dados</a></li>
              <li><a href="#" className="hover:underline">Segunda Via do Cartão</a></li>
            </ul>
          </div>

          {/* Government */}
          <div>
            <h3 className="font-semibold mb-4">Governo</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Portal gov.br</a></li>
              <li><a href="#" className="hover:underline">Transparência</a></li>
              <li><a href="#" className="hover:underline">Dados Abertos</a></li>
              <li><a href="#" className="hover:underline">Ouvidoria</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Atendimento</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Central de Atendimento</strong></p>
              <p>📞 135</p>
              <p>🕐 Segunda a sexta, 7h às 19h</p>
              <p><strong>Ouvidoria</strong></p>
              <p>📞 0800 644 0101</p>
              <p>💻 ouvidoria.mds.gov.br</p>
            </div>
          </div>
        </div>

        {/* Government Links */}
        <div className="border-t border-blue-700 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <a href="#" className="hover:underline">Portal do Governo</a>
            <a href="#" className="hover:underline">Acesso à Informação</a>
            <a href="#" className="hover:underline">Legislação</a>
            <a href="#" className="hover:underline">Acessibilidade</a>
          </div>
        </div>

        {/* Legal Info */}
        <div className="border-t border-blue-700 pt-6 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="mb-2 md:mb-0">
                <strong>Ministério do Desenvolvimento e Assistência Social</strong>
              </p>
              <p className="text-blue-200">
                Esplanada dos Ministérios, Bloco A, 3º andar - Brasília-DF - CEP: 70054-906
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png"
                alt="Logo Gov.br"
                className="h-8 opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700 pt-4 mt-6 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} Governo Federal. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}