# ATIVIDADES ESCOLA ACME API
Situação de Aprendizagem - Back-End (Node.JS, JavaSript, VsCode, ORM Prisma, Insomnia)
## Contextualização
A ESCOLA ACME tem atuado em nossa cidade com ótimo atendimento e confiabilidade, é nossa cliente e necessita de um sistema Web para registro das atividades e notas de seus alunos.<br>O P.O. após uma visita ao cliente, elaborou o DER e UML DC(Diagrama de Classes) a seguir e elencou os requisitos funcionais.<br>
![DER e DC](./docs/der-dc.png)
## Desafio
Desenvolver as funcionalidades conforme requisitos

### Requisitos funcionais
- [RF001] O sistema deve permitir o CRUD de Alunos.
    - [RF001.1] O sistema deve permitir o CRUD de telefones, pois cada **aluno** pode possuir 0 ou vários telefones de tipos diferentes como celular, fixo ou comercial.
    - [RF001.2] A rota **read** do **aluno** deve mostrar os dados de todos os alunos e seus respectivos telefones.
    - [RF001.3] A rota **readOne** do **aluno** deve mostrar os dados de um aluno específico, seus telefones e suas **atividades**.
- [RF002] O sistema deve permitir o CRUD de Atividades.
    - [RF002.1] O sistema deve associar a atividade a um aluno.
    - [RF002.2] Ao cadastrar uma nova atividade **create** no controller, a dataInicio deve ser gerada pelo Banco de Dados @dedault(now()).
    - [RF002.3] Ao cadastrar uma nova atividade **create** no controller, a dataEntrega, a nota e a parcial podem ser nulas **"?"** pois serão preenchidas na rota **update** quando o aluno entregar e o professor corrigir.
    - [RF002.4] Se ao realizar **update** o campo **nota** for enviado o sistema deve calcular a **parcial** com a formula **"nota * peso / 10"**.

### Casos de teste (Insomnia)
- [CT001] Deve ser cadastrado pelo menos 5 alunos.
- [CT002] Deve ser cadastrado ao menos 1 telefone para cada aluno.
    - [CT002.1] Pelo menos dois alunos devem ter dois ou mais telefones cadastrados.
- [CT003] Cadastre, altere e exclua um aluno.
- [CT004] Cadastre uma atividade para cada aluno.
    - [CT004.1] Pelo menos um aluno deve ter duas ou mais atividades cadastradas.
- [CT005] Cadastre, altere e exclua uma atividade.

# API - Backend com Node.js, Prisma e MySQL

## ⚙️ Tecnologias Utilizadas

- **Backend:** Node.js (v18+)
- **Linguagem:** JavaScript
- **Banco de Dados:** MySQL (ou outro compatível com Prisma)
- **ORM:** Prisma
- **Ambiente de Desenvolvimento:** Visual Studio Code
- **Testes de API:** Insomnia
- **Controle de Versão:** Git
- **Gerenciamento de Pacotes:** npm ou yarn

---

## 🚀 Passo a Passo para Executar a API

### 1️⃣ Clone o Repositório e Acesse a Pasta
```sh
$ git clone <URL_DO_REPOSITORIO>
$ cd api
```

### 2️⃣ Instale as Dependências
```sh
$ npm install
```

### 3️⃣ Configure o Ambiente
- Renomeie o arquivo `.env.example` para `.env`
- Preencha a variável `DATABASE_URL` com os dados de conexão do MySQL

### 4️⃣ Execute as Migrações do Prisma
```sh
$ npx prisma migrate dev --name init
```

### 5️⃣ (Opcional) Popule o Banco de Dados com Dados de Teste
```sh
$ npx prisma db seed
```

### 6️⃣ Inicie o Servidor
```sh
$ npm run dev
```
> O servidor estará rodando na porta `3000`.

---

## 🔍 Testando a API

### 📌 Utilize o Insomnia para Testar as Rotas
- `/api/alunos`
- `/api/atividades`

### 📌 Siga a Sequência de Testes
Os testes estão documentados no formato `[CT001]` a `[CT005]`.

---

## 🛠️ Dicas Rápidas

- Verifique possíveis erros nos logs do servidor.
- Acesse o Prisma Studio para visualizar os dados do banco:
```sh
$ npx prisma studio
```
- **Mantenha o arquivo `.env` seguro e atualizado!**

---

A API estará pronta para cadastrar **alunos, telefones e atividades** conforme os requisitos do projeto. 🚀

