# SAP MM Support Assistant — AI-Powered Ticket Resolution

Assistente inteligente de suporte SAP MM que utiliza LLM, RAG e Human-in-the-Loop para analisar chamados e fornecer orientações fundamentadas na base de conhecimento oficial.

---

## Sobre o Projeto

Este projeto é um protótipo funcional de um assistente de suporte SAP MM construído para o desafio técnico da Verity. O sistema recebe chamados de suporte via API (simulando uma plataforma de tickets como Freshdesk ou ServiceNow), analisa o problema utilizando IA com RAG, e roteia a resposta para três cenários distintos:

- **Resposta direta** — chamado resolvido automaticamente com orientações fundamentadas
- **Solicitação de informações** — chamado incompleto, sistema pede mais dados ao usuário
- **Aprovação humana** — caso crítico encaminhado para o especialista com botões de ação

---

## Arquitetura

```
Plataforma de Tickets (Postman)
        ↓ POST /chamado
n8n Webhook (Basic Auth)
        ↓
ticket_processing (Code Node)
Extrai: sistema, módulo, usuário, prioridade, ticket_id
        ↓
AI Agent (GPT-4o-mini)
- Tool: Pinecone Vector Store (RAG)
  - Base: Manual SAP MM (text-embedding-3-small)
- System Prompt com regras de decisão
        ↓
processes_response (Code Node)
Parse JSON + validação de campos
        ↓
save_ticket (Supabase)
Registra chamado com status e tipo de resposta
        ↓
Switch — 3 branches
- Branch 1 (requer_aprovacao_humana = true)
  - Email gestor com botões Aprovar/Rejeitar
  - Email usuário — chamado encaminhado
  - HTTP Request → API da plataforma de tickets
- Branch 2 (solicitar_mais_informacoes = true)
  - Email usuário — solicitação de dados
  - HTTP Request → API da plataforma de tickets
- Branch 3 (default — respondido)
    - Email usuário — resposta completa
    - HTTP Request → API da plataforma de tickets
```

---

## Decisões Técnicas

### LLM — GPT-4o-mini
Escolhido pela boa relação custo/benefício e capacidade de seguir instruções estruturadas em JSON. Suficiente para o escopo de suporte SAP MM sem necessidade de modelos mais pesados.

### RAG com Pinecone
A base de conhecimento é o Manual SAP MM (PDF) indexado no Pinecone com `text-embedding-3-small`. O agente busca os chunks mais relevantes antes de gerar a resposta, garantindo que as orientações sejam fundamentadas na documentação real — não no conhecimento geral do modelo.

### Prompt Engineering
O system prompt define:
- Formato de resposta obrigatório em JSON estruturado
- Regras explícitas de quando acionar Human-in-the-Loop
- Instrução para nunca inventar transações ou procedimentos
- Tratamento de chamados fora do escopo SAP MM

### Human-in-the-Loop
Três situações acionam validação humana:
1. **Desbloqueio de fornecedor** — risco de pagamento indevido
2. **Estorno de fatura com pagamento processado** — impacto financeiro irreversível
3. **Alteração de perfil de autorização** — risco de segurança

O gestor recebe um email com botões Aprovar/Rejeitar que disparam um webhook separado e atualizam o Supabase automaticamente.

### Supabase
Registra todos os chamados com: texto original, análise do agente, status, tipo de resposta (recomendacao_ia / aguardando_aprovacao_humana), e flag de aprovação humana. Permite rastreabilidade completa.

### HTTP Request fictício
Em produção, as respostas seriam injetadas diretamente na plataforma de tickets via API (Freshdesk, ServiceNow, Jira). No protótipo, um HTTP Request simula esse retorno e explica o conceito.

---

## Estrutura do Repositório

```
- workflows/
  - sap_support_main.json      # Workflow principal n8n
  - sap_approval_webhook.json  # Workflow de aprovação humana
- knowledge_base/
  - Manual_SAP_MM.pdf          # Base de conhecimento indexada no Pinecone
- postman/
  - SAP_Support_Collection.json # Collection com os 5 chamados de teste
- docs/
  - architecture_diagram.png   # Diagrama da arquitetura
- README.md
```

---

## Como Executar

### Pré-requisitos
- n8n (self-hosted ou cloud)
- Conta OpenAI com API key
- Conta Pinecone com index `sap-database` e namespace `sap-support`
- Conta Supabase com tabela `chamados`
- Conta de email configurada no n8n

### 1. Configurar o Pinecone
Indexar o Manual SAP MM no Pinecone enviando o PDF via POST para o webhook de upload:

```bash
POST /upload-doc
{
  "titulo": "Manual SAP MM",
  "conteudo": "[conteúdo do documento]"
}
```

### 2. Criar tabela no Supabase

```sql
create table chamados (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp default now(),
  chamado_texto text,
  modulo_identificado text,
  processo_identificado text,
  causas_possiveis text,
  proximos_passos text,
  fontes_consultadas text,
  nivel_confianca text,
  requer_humano boolean default false,
  status text default 'recebido',
  resposta_final text,
  ticket_id text,
  tipo_resposta text default 'recomendacao_ia'
);
```

### 3. Importar workflows no n8n
Importar os dois arquivos JSON da pasta `workflows/`.

### 4. Configurar credenciais no n8n
- OpenAI API key
- Pinecone API key
- Supabase URL e key
- SMTP para envio de email

### 5. Testar com Postman
Importar a collection `postman/SAP_Support_Collection.json` e executar os 5 chamados de teste.

---

## Cenários de Teste

| Ticket | Chamado | Branch | Resultado |
|--------|---------|--------|-----------|
| TKT-001 | Requisição não converte em PO | Branch 2 | Solicitou mais informações |
| TKT-002 | Desbloquear fornecedor urgente | Branch 1 | Aprovação humana |
| TKT-003 | SAP não está funcionando | Branch 2 | Solicitou mais informações |
| TKT-004 | Material no depósito errado | Branch 3 | Respondeu diretamente |
| TKT-005 | Configurar Outlook (fora do escopo) | Branch 3 | Redirecionou para suporte correto |

---

## Limitações e Riscos

- **Qualidade do RAG** depende da completude da base de conhecimento indexada
- **Alucinações** podem ocorrer em casos muito específicos não cobertos pelo manual
- **Latência** de 5-15 segundos por chamado (LLM + Pinecone + email)
- **Escopo limitado** ao módulo MM — outros módulos SAP não estão cobertos
- **Protótipo** — não está preparado para volume de produção sem ajustes de rate limiting e error handling mais robustos
- **HTTP Request fictício** — em produção substituir pela API real da plataforma de tickets do cliente

---

## Stack Tecnológica

| Componente | Tecnologia |
|------------|------------|
| Orquestração | n8n |
| LLM | OpenAI GPT-4o-mini |
| Embeddings | text-embedding-3-small |
| Vector Store | Pinecone |
| Banco de dados | Supabase (PostgreSQL) |
| Base de conhecimento | Manual SAP MM (PDF) |
| Simulação de chamados | Postman |

---

## Autor

Renan Ferrarezi — AI Automation Consultant  
[LinkedIn](https://linkedin.com/in/renanferrarezi) · [GitHub](https://github.com/renanferrarezi)
