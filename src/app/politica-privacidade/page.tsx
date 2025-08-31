export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">
          <a href="/" className="hover:text-blue-200">← Voltar ao Portal</a>
          <span className="font-medium">Portal de Benefícios 2025</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        <p className="text-gray-600 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações da Empresa</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Razão Social:</strong> Portal de Benefícios Alimentares Ltda</p>
              <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
              <p><strong>Endereço:</strong> Rua das Flores, 123, Centro - São Paulo/SP - CEP: 01234-567</p>
              <p><strong>Telefone:</strong> (11) 3456-7890</p>
              <p><strong>E-mail:</strong> contato@portaldebenef2025.com.br</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados Coletados (LGPD)</h2>
            <p className="text-gray-700 mb-4">Coletamos apenas os dados necessários:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Dados de Identificação:</strong> CPF, nome completo (com consentimento)</li>
              <li><strong>Dados de Contato:</strong> E-mail, telefone (apenas se fornecido voluntariamente)</li>
              <li><strong>Dados Técnicos:</strong> Endereço IP (para segurança), cookies essenciais</li>
              <li><strong>Dados de Navegação:</strong> Páginas visitadas, tempo de permanência</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidade e Base Legal</h2>
            <p className="text-gray-700 mb-4">Tratamos dados para:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Verificar elegibilidade a programas de benefícios</li>
              <li>Processar pagamentos de produtos alimentícios</li>
              <li>Comunicar sobre status de pedidos</li>
              <li>Cumprir obrigações legais</li>
              <li>Interesse legítimo para prestação de serviços</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Segurança de Dados (SSL)</h2>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-green-800"><strong>✓ SSL Ativo:</strong> Este site utiliza criptografia SSL (https://) para proteger todas as informações sensíveis durante a transmissão.</p>
              <p className="text-green-700 mt-2">Certificado SSL válido garante que seus dados pessoais (CPF, nome, e-mail) são criptografados e protegidos contra interceptação.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seus Direitos (LGPD)</h2>
            <p className="text-gray-700 mb-4">Conforme LGPD, você pode:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Confirmar existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou inexatos</li>
              <li>Solicitar anonimização ou eliminação</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Portabilidade dos dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies e Rastreamento</h2>
            <p className="text-gray-700 mb-4">Utilizamos apenas cookies essenciais para funcionamento do site. Não compartilhamos informações pessoais (PII) com terceiros através de tags de remarketing ou URLs.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Compartilhamento de Dados</h2>
            <p className="text-gray-700 mb-4">Dados são compartilhados apenas com:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Processadores de pagamento autorizados</li>
              <li>Empresas de logística para entrega</li>
              <li>Autoridades legais quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contato e DPO</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p><strong>Encarregado de Dados (DPO):</strong> dpo@portaldebenef2025.com.br</p>
              <p><strong>Privacidade:</strong> privacidade@portaldebenef2025.com.br</p>
              <p><strong>Telefone:</strong> (11) 3456-7890</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}