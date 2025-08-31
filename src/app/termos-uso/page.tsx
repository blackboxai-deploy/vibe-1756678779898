export default function TermosUso() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">
          <a href="/" className="hover:text-blue-200">← Voltar ao Portal</a>
          <span className="font-medium">Portal de Benefícios 2025</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
        <p className="text-gray-600 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Identificação da Empresa</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Empresa:</strong> Portal de Benefícios Alimentares Ltda</p>
              <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
              <p><strong>Endereço:</strong> Rua das Flores, 123, Centro - São Paulo/SP</p>
              <p><strong>CEP:</strong> 01234-567</p>
              <p><strong>Responsável Legal:</strong> João Silva Santos</p>
              <p><strong>E-mail:</strong> juridico@portaldebenef2025.com.br</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Natureza dos Serviços</h2>
            <p className="text-gray-700 mb-4">Oferecemos:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Consulta de elegibilidade para programas de benefícios alimentares</li>
              <li>Venda de produtos alimentícios orgânicos premium</li>
              <li>Processamento de pagamentos via PIX</li>
              <li>Entrega de produtos em todo território nacional</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Transparência de Preços</h2>
            <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
              <p className="text-yellow-800"><strong>Preços Claros:</strong> Todos os preços são exibidos de forma transparente antes da compra.</p>
              <p className="text-yellow-700 mt-2">Produto: Açaí Premium Orgânico - R$ 47,00 (preço único, sem taxas ocultas, sem mensalidades ou anuidades).</p>
              <p className="text-yellow-700 mt-2">Frete: Grátis para todo o Brasil.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Produtos e Qualificações</h2>
            <p className="text-gray-700 mb-4">Nossos produtos:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>São alimentícios orgânicos certificados</li>
              <li>Estão em estoque e disponíveis para entrega</li>
              <li>Possuem certificação de qualidade</li>
              <li>São produzidos por fornecedores licenciados</li>
              <li>Não são software, malware ou produtos digitais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Política Anti-Malware</h2>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800"><strong>Compromisso de Segurança:</strong></p>
              <ul className="list-disc pl-6 text-red-700 mt-2 space-y-1">
                <li>Não hospedamos ou promovemos software malicioso</li>
                <li>Site livre de vírus, malware ou códigos maliciosos</li>
                <li>Não coletamos dados sem consentimento</li>
                <li>Não instalamos software no dispositivo do usuário</li>
                <li>Sistema regularmente verificado por antivírus</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Práticas Comerciais Éticas</h2>
            <p className="text-gray-700 mb-4">Garantimos:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Informações verdadeiras sobre produtos e serviços</li>
              <li>Não sugerimos endossos não autorizados</li>
              <li>Transparência total sobre custos e prazos</li>
              <li>Identificação clara da empresa em todas as comunicações</li>
              <li>Não nos passamos por outras empresas ou marcas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conformidade com Google Ads</h2>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-blue-800"><strong>Políticas Cumpridas:</strong></p>
              <ul className="list-disc pl-6 text-blue-700 mt-2 space-y-1">
                <li>Transparência total de preços (sem taxas ocultas)</li>
                <li>Segurança de dados com SSL ativo</li>
                <li>Não coleta PIIs sem consentimento</li>
                <li>Não promove software indesejado ou malware</li>
                <li>Práticas comerciais honestas e transparentes</li>
                <li>Identificação clara da empresa e produtos</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitações de Responsabilidade</h2>
            <p className="text-gray-700 mb-4">Não nos responsabilizamos por:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Interrupções temporárias do serviço</li>
              <li>Problemas técnicos de terceiros (bancos, correios)</li>
              <li>Decisões tomadas com base nas informações do site</li>
              <li>Flutuações de preços de produtos alimentícios</li>
              <li>Sites comprometidos ou ataques externos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Lei Aplicável</h2>
            <p className="text-gray-700 mb-4">
              Estes termos são regidos pelas leis brasileiras. Foro da comarca de São Paulo/SP 
              para resolução de disputas.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}