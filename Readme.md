<h1 align="center">💼 Sistema de Gestão de Clientes e Ativos Financeiros</h1>
Este projeto consiste no desenvolvimento de uma aplicação para um escritório de investimentos, que permite gerenciar clientes e visualizar informações básicas sobre ativos financeiros. A aplicação é construída em TypeScript, com backend em Node.js (Fastify + Prisma), frontend em Next.js e containerização via Docker Compose.

<br><br>
<div align="center">
    <h2>Funcionalidades</h2>
    <div align="left">
        <h3>→ Backend</h3>
        <p>CRUD completo de clientes (nome, e-mail, status: ativo/inativo).</p>
        <p>Listagem de ativos financeiros com valores estáticos.</p>
        <p>Integração com MySQL via Prisma ORM.</p>
        <p>Validação de dados utilizando Zod.</p>
    </div>
    <div align="right">
        <h3>Frontend ←</h3>
        <p>Página para listar, adicionar e editar clientes.</p>
        <p>Página para exibir lista fixa de ativos financeiros.</p>
        <p>Componentização e estilização utilizando ShadCN.</p>
        <p>Integração com backend usando React Query, Axios e React Hook Form + Zod.</p>
    </div>
</div>

<br><br>
<div align="center">
<h2>🛠️ Tecnologias Utilizadas 🛠️</h2>
    <h3>Backend</h3>
    <img src="https://img.shields.io/badge/Node.js-%232e1b45.svg?style=for-the-badge&logo=node.js&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/Fastify-%232e1b45.svg?style=for-the-badge&logo=fastify&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/Prisma-%232e1b45.svg?style=for-the-badge&logo=prisma&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/MySQL-%232e1b45.svg?style=for-the-badge&logo=mysql&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/Zod-%232e1b45.svg?style=for-the-badge&logoColor=%23BBDEAD" />
    <h3>Frontend</h3>
    <img src="https://img.shields.io/badge/Next.js-%232e1b45.svg?style=for-the-badge&logo=next.js&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/React_Query-%232e1b45.svg?style=for-the-badge&logo=react-query&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/React_Hook_Form-%232e1b45.svg?style=for-the-badge&logo=reacthookform&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/Tailwind-%232e1b45.svg?style=for-the-badge&logo=tailwindcss&logoColor=23BBDEAD" />
    <img src="https://img.shields.io/badge/Axios-%232e1b45.svg?style=for-the-badge&logo=axios&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/Zod-%232e1b45.svg?style=for-the-badge&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/ShadCN-%232e1b45.svg?style=for-the-badge&logoColor=%23BBDEAD" />
    <h3>DevOps/Deploy</h3>
    <img src="https://img.shields.io/badge/Docker-%232e1b45.svg?style=for-the-badge&logo=docker&logoColor=%23BBDEAD" />
    <img src="https://img.shields.io/badge/Docker_Compose-%232e1b45.svg?style=for-the-badge&logo=docker&logoColor=%23BBDEAD" />
</div>

<br><br>
<h2 align="center">⚙️ Como Executar o Projeto</h2>
1. Clone o repositório
    
```bash
$ git clone https://github.com/Camilay3/caseAnka
```
2. Configure as variáveis de ambiente conforme o [exemplo de .env](env-example.txt)
3. Execute a aplicação com Docker Compose:

```bash
# Navegue até a pasta
> cd caseAnka

# Pré-requisitos: Docker e Node.js instalados

# Execute o docker
> docker-compose up --build
```
4. Acesse http://localhost:3000

<br><br>
## 🎯 Desafios e soluções
#### Primeiro dia: 
- Compreender o funcionamento do docker e resolver conflitos na instalação. Resolvi consultando vídeos explicativos e soluções na comunidade.
- Integrar tecnologias que eu já conhecia com novos frameworks, além do uso do Docker (erro recorrente: tabela não encontrada). Resolvi reconfigurando o docker-compose e incluindo a instalação do cliente MySQL no Dockerfile.

#### Segundo dia:
- Resolver conflitos entre as rotas do React e do backend. Reestruturei o projeto, organizando pastas e arquivos para utilizar o App Router.
- Corrigir o problema de conexão do banco de dados via Docker, causado por senhas complexas. Ajustei as variáveis de ambiente no docker-compose e reiniciei completamente os containers.

#### Terceiro e quarto dia:
- Garantir que o banco fosse criado e atualizado automaticamente durante a execução do Docker com prisma db push. Enfrentei o erro P1001 (falha na conexão com o banco). Após revisão da documentação e testes, incluí a exposição da porta no docker-compose, removi caracteres especiais da senha do MySQL, refatorei o script de inicialização no package.json e adicionei um delay (sleep 40) para assegurar que o backend só inicie após o banco estar pronto.

<br><br>
### 📝 Observações
O foco principal está na implementação funcional, não no design visual. A lista de ativos é fixa e de leitura apenas (no frontend).

#### Tela principal
![image](https://github.com/user-attachments/assets/e15a54b4-2454-45a6-8ab7-6f2282db302b)

## 📧 Contato
Para dúvidas, feedbacks e/ou sugestões, entre em contato: [camila.santiago026@gmail.com]
