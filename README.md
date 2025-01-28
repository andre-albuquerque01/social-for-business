# Social Media in laravel

## Requisitos do Sistema

Para operar o sistema, são necessários os seguintes requisitos mínimos na sua máquina: PHP, Composer, Node.js e Docker. O PHP e o Composer são essenciais para executar o Laravel, que contém a API principal do sistema. O Node.js é necessário para executar o front-end, enquanto o Docker é utilizado para virtualizar o ambiente no qual a API é executada. Estes componentes garantem a funcionalidade e o desempenho ideais do nosso sistema de forma integrada e eficiente.

## Requisitos Funcionais

### RF01. Login de Cliente

- Informações: permitir que os usuários do aplicativo façam login com seus dados pessoais, e-mail e senha.

Regras:

- Cadastro novo Cliente: para criar um novo cadastro de cliente, o cliente deve fornecer um endereço de email e uma senha. Após o cadastro, um email de confirmação será enviado para o endereço de email fornecido, a fim de validar o novo cadastro do cliente.
- Esqueci a senha: o cliente esqueceu sua senha, logo é enviado um e-mail um token.
- Autenticação: O sistema deve verificar se as informações de login do cliente, verificar se já é cadastrado, caso o cliente já esteja cadastrado, mostra mensagem cliente cadastrado, se não houver cadastro daquele cliente segue a rotina normalmente.

### RF02. Gerenciamento de posts

- Informações: permitir que o usuário faça posts, edite e remova suas publicações.

Regras:

- A aplicação deve permitir que o usuário publicações.
- A aplicação deve permitir que o usuário edite a suas publicações.
- A aplicação deve permitir que o usuário visualizem as suas e as publicações de outras pessoas.
- A aplicação deve permitir que o usuário exclua a suas publicações.

### RF03. Gerenciamento de comentários

- Informações: permitir que o usuário faça comentários e remova seus comentários.

### RF04. Dashboard

- Informações: permitir que os usuários da aplicação visualizem o Dashboard, que contará com as publicações mais recentes.

Regras:

- Permitir que os usuários visualizem o perfil de outros usuários para ver suas publicações.
- Permitir que os usuários visualizem comentários dos outros usuários.

## Arquitetura do Sistema

O sistema utiliza as seguintes tecnologias:

- **Linguagens:** PHP, TypeScript
- **Banco de Dados:** MySQL
- **Frameworks:** Laravel, Next.js
- **Arquitetura da API:** MVC, RESTful
- **Outras Tecnologias:** React, Docker

## Observação

- O sistema utiliza filas (queues) no Laravel para enviar e-mails de forma assíncrona, funcionando em segundo plano.

## Como Iniciar o Sistema

### Passo 1: Download dos Arquivos

Clone o repositório:

```bash
git clone https://github.com/andre-albuquerque01/social-for-business.git
```

### Passo 2: Configuração do Back-end

Entre na pasta back-end:

```bash
cd /Api
```

Inicialize os pacotes do Laravel:

```php
composer install
```

Crie um arquivo `.env` na raiz do seu projeto e configure as variáveis de ambiente conforme necessário.
Execute `php artisan config:cache` para aplicar as configurações do arquivo `.env`.

Inicie o servidor da API:

```bash
./vendor/bin/sail up
```

Para desativar o servidor da API:

```bash
./vendor/bin/sail down
```

### Passo 3: Configuração do Front-end

Entre na pasta front-end:

```bash
cd ../interface
```

Baixe as dependências do Node.js:

```bash
npm i
```

Inicie o servidor do Next.js:

```bash
npm run dev
```

### Passo 4: Acesso ao Sistema

Abra o navegador e acesse `http://localhost:3000` para utilizar o serviço.

### Imagens do sistema

#### A seguir, apresentamos algumas imagens que demonstram as funcionalidades do sistema

- Início

<img src="assets/index.jpg" alt="Index" />

- Dashboard

<img src="assets/dashboard.jpg" alt="Dashboard" />
