{
  "info": {
    "_postman_id": "befd0b54-dfdd-405a-881e-1b867eb12ed6",
    "name": "SEU_USUARIO",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "40342254",
    "_collection_link": "https://go.postman.co/collection/40342254-befd0b54-dfdd-405a-881e-1b867eb12ed6?source=collection_link"
  },
  "item": [
    {
      "name": "sap-rag",
      "request": {
        "auth": {
          "type": "basic",
          "basic": [
            {
              "key": "password",
              "value": "SUA_SENHA",
              "type": "string"
            },
            {
              "key": "username",
              "value": "SEU_USUARIO",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "system",
              "value": "sap",
              "type": "text",
              "uuid": "638e8365-337d-43c6-a17f-b3528f71fbd0"
            },
            {
              "key": "created_ai",
              "value": "2026-09-18",
              "type": "text",
              "uuid": "b52bfbd9-e159-491f-acf3-6d219f3c5851"
            },
            {
              "key": "content",
              "value": "sap-manual",
              "type": "text",
              "uuid": "6ee87488-0502-4227-90f2-cfc58eb2519f"
            },
            {
              "key": "doc",
              "type": "file",
              "uuid": "af2dcaf0-c4b8-4b73-9e33-f4ecac214aba",
              "src": "/C:/Users/renan.ferrarezi/Downloads/Manual_SAP_MM_Base_Conhecimento.pdf"
            }
          ]
        },
        "url": {
          "raw": "https://n8n.nexmindai.com.br/webhook-test/sap-rag",
          "protocol": "https",
          "host": [
            "n8n",
            "nexmindai",
            "com",
            "br"
          ],
          "path": [
            "webhook-test",
            "sap-rag"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Teste 1 Chamado normal",
      "request": {
        "auth": {
          "type": "basic",
          "basic": [
            {
              "key": "password",
              "value": "SUA_SENHA",
              "type": "string"
            },
            {
              "key": "username",
              "value": "SEU_USUARIO",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"sistema\": \"SAP\",\r\n  \"modulo\": \"MM\",\r\n  \"chamado\": \"Bom dia! Estou tentando converter uma requisição de compra em pedido de compra mas o sistema não está deixando. A requisição existe com status liberada e o fornecedor está definido. O que pode estar impedindo?\",\r\n  \"usuario\": \"joao.silva@empresa.com\",\r\n  \"prioridade\": \"normal\",\r\n  \"ticket_id\": \"TKT-001\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://n8n.nexmindai.com.br/webhook-test/chamado",
          "protocol": "https",
          "host": [
            "n8n",
            "nexmindai",
            "com",
            "br"
          ],
          "path": [
            "webhook-test",
            "chamado"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Teste 2 Chamado critico",
      "request": {
        "auth": {
          "type": "basic",
          "basic": [
            {
              "key": "password",
              "value": "SUA_SENHA",
              "type": "string"
            },
            {
              "key": "username",
              "value": "SEU_USUARIO",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"sistema\": \"SAP\",\r\n  \"modulo\": \"MM\",\r\n  \"chamado\": \"Bom dia! Estou tentando converter uma requisição de compra em pedido de compra mas o sistema não está deixando. A requisição existe com status liberada e o fornecedor está definido. O que pode estar impedindo?\",\r\n  \"usuario\": \"joao.silva@empresa.com\",\r\n  \"prioridade\": \"normal\",\r\n  \"ticket_id\": \"TKT-001\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://n8n.nexmindai.com.br/webhook-test/chamado",
          "protocol": "https",
          "host": [
            "n8n",
            "nexmindai",
            "com",
            "br"
          ],
          "path": [
            "webhook-test",
            "chamado"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Teste 3 chamado incompleto",
      "request": {
        "auth": {
          "type": "basic",
          "basic": [
            {
              "key": "password",
              "value": "SUA_SENHA",
              "type": "string"
            },
            {
              "key": "username",
              "value": "SEU_USUARIO",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"sistema\": \"SAP\",\r\n  \"modulo\": \"MM\",\r\n  \"chamado\": \"Bom dia! Estou tentando converter uma requisição de compra em pedido de compra mas o sistema não está deixando. A requisição existe com status liberada e o fornecedor está definido. O que pode estar impedindo?\",\r\n  \"usuario\": \"joao.silva@empresa.com\",\r\n  \"prioridade\": \"normal\",\r\n  \"ticket_id\": \"TKT-001\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://n8n.nexmindai.com.br/webhook-test/chamado",
          "protocol": "https",
          "host": [
            "n8n",
            "nexmindai",
            "com",
            "br"
          ],
          "path": [
            "webhook-test",
            "chamado"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Teste 4 chamado de sucesso",
      "request": {
        "auth": {
          "type": "basic",
          "basic": [
            {
              "key": "password",
              "value": "SUA_SENHA",
              "type": "string"
            },
            {
              "key": "username",
              "value": "SEU_USUARIO",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"sistema\": \"SAP\",\r\n  \"modulo\": \"MM\",\r\n  \"chamado\": \"Bom dia! Estou tentando converter uma requisição de compra em pedido de compra mas o sistema não está deixando. A requisição existe com status liberada e o fornecedor está definido. O que pode estar impedindo?\",\r\n  \"usuario\": \"joao.silva@empresa.com\",\r\n  \"prioridade\": \"normal\",\r\n  \"ticket_id\": \"TKT-001\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://n8n.nexmindai.com.br/webhook-test/chamado",
          "protocol": "https",
          "host": [
            "n8n",
            "nexmindai",
            "com",
            "br"
          ],
          "path": [
            "webhook-test",
            "chamado"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Teste 5 chamado fora de escopo",
      "request": {
        "auth": {
          "type": "basic",
          "basic": [
            {
              "key": "password",
              "value": "SUA_SENHA",
              "type": "string"
            },
            {
              "key": "username",
              "value": "SEU_USUARIO",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\r\n  \"sistema\": \"SAP\",\r\n  \"modulo\": \"MM\",\r\n  \"chamado\": \"Bom dia! Estou tentando converter uma requisição de compra em pedido de compra mas o sistema não está deixando. A requisição existe com status liberada e o fornecedor está definido. O que pode estar impedindo?\",\r\n  \"usuario\": \"joao.silva@empresa.com\",\r\n  \"prioridade\": \"normal\",\r\n  \"ticket_id\": \"TKT-001\"\r\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "https://n8n.nexmindai.com.br/webhook-test/chamado",
          "protocol": "https",
          "host": [
            "n8n",
            "nexmindai",
            "com",
            "br"
          ],
          "path": [
            "webhook-test",
            "chamado"
          ]
        }
      },
      "response": []
    }
  ]
}
