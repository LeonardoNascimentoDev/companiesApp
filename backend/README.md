# #Backend Empresas App
Backend para funcionamento de um cadastro de empresas em node js utilizando.

## Rotas
- `POST /empresas`: Responsável pelo cadastro das empresas
```js
// Request(Body):
{
  "nome": "BrBatel Matriz",
  "cnpj": "27791065000159",
  "valor_monetario":"10.000",
  "faturamento_anual": "10.000.000",
  "sobre": "Empresa promissora, e com altas expectativas para 2021",
  "logo":"Arquivo em base64"
  }
// Response: StatusCode: 200 (OK)
{
  "nome": "BrBatel Matriz",
  "cnpj": "27791065000159",
  "valor_monetario": "10.000",
  "faturamento_anual": "10.000.000",
  "sobre": "Empresa promissora, e com altas expectativas para 2021",
  "logo": "Arquivo em base64"
}
```

- `GET /empresa`: Responsável por buscar todas empresas
```js
// Request(Query):
// Response: StatusCode: 200 (OK)
{
    "nome": "BrBatel2",
    "cnpj": "27791065000159",
    "valor_monetario": "20.000",
    "faturamento_anual": "20.000.000",
    "sobre": "Empresa promissora, e com altas expectativas para 2021",
    "createdAt": "2021-04-08T02:18:17.360Z",
    "updatedAt": "2021-04-10T23:12:13.573Z",
}
```

- `GET /empresas/search/:search`: Responsável por buscar a respectiva na barra de pesquisa
```js
// Request(Query):
// Response: StatusCode: 200 (OK)
{
  "nome": "teste",
  "cnpj": "00.282.862/0001-54",
  "valor_monetario": "10",
  "faturamento_anual": "20",
  "sobre": "teste",
  "logo": "Arquivo em base64"
}
```

- `GET /empresas/search/:search`: Responsável por buscar a respectiva na barra de pesquisa
```js
// Request(Query):
// Response: StatusCode: 200 (OK)
{
  "nome": "teste",
  "cnpj": "00.282.862/0001-54",
  "valor_monetario": "10",
  "faturamento_anual": "20",
  "sobre": "teste",
  "logo": "Arquivo em base64"
}
```

- `PUT /empresa/:id`: Responsável por editar a empresa
```js
// Request(Query):
// Response: StatusCode: 200 (OK)
{
  "nome": "BrBatel2",
  "cnpj": "27791065000159",
  "valor_monetario": "20.000",
  "faturamento_anual": "20.000.000",
  "sobre": "Empresa promissora, e com altas expectativas para 2021"
 }
```

- `DELETE /empresa/:id`: Responsável por excluir a empresa
```js
// Request(Query):
// Response: StatusCode: 200 (OK)
{
  "nome": "BrBatel2",
  "cnpj": "27791065000159",
  "valor_monetario": "20.000",
  "faturamento_anual": "20.000.000",
  "sobre": "Empresa promissora, e com altas expectativas para 2021"
 }
 
```
- `POST /empresas/paginacao`: Responsável pela paginação
```js
// Request(Body):
{
  "page": "1",
}
// Response: StatusCode: 200 (OK)
{
  "nome": "BrBatel2",
  "cnpj": "27791065000159",
  "valor_monetario": "20.000",
  "faturamento_anual": "20.000.000",
  "sobre": "Empresa promissora, e com altas expectativas para 2021"
 }
```

## Execução
Para executar o projeto use:(Projeto rodando na porta http://localhost:3333)
```js
npm install
npm run dev
```
Para executar os testes use:
```js
npm run test
```
