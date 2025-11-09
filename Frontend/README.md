# Frontend - Sistema de Usuários

Interface moderna e responsiva para o sistema de usuários, construída com React, Vite e Tailwind CSS.

## 🚀 Funcionalidades

- ✅ Página de Login com validações
- ✅ Página de Cadastro completa
- ✅ Dashboard do usuário
- ✅ Autenticação com JWT
- ✅ Roteamento protegido
- ✅ Design responsivo e moderno
- ✅ Validações em tempo real
- ✅ Notificações toast
- ✅ Gerenciamento de estado com Context

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend da API rodando

## 🛠️ Instalação

1. **Navegue até a pasta Frontend:**
```bash
cd Frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp env.example .env
```

4. **Edite o arquivo `.env` com suas configurações:**
```env
# URL da API Backend
VITE_API_URL=http://localhost:3000/api

# Configurações do ambiente
VITE_APP_NAME=Sistema de Usuários
VITE_APP_VERSION=1.0.0
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3001`

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações
- **Axios** - Cliente HTTP

## 📱 Páginas

### 🔐 Login (`/login`)
- Formulário de login com validações
- Mostrar/ocultar senha
- Validação de email e senha
- Redirecionamento automático

### 📝 Cadastro (`/register`)
- Formulário completo de cadastro
- Validações robustas (CPF, email, senha)
- Campos opcionais e obrigatórios
- Confirmação de senha

### 🏠 Dashboard (`/dashboard`)
- Informações do usuário logado
- Cards com dados pessoais
- Ações rápidas
- Design responsivo

## 🔧 Funcionalidades

### Autenticação
- Login com email e senha
- Cadastro completo de usuários
- Logout seguro
- Tokens JWT automáticos
- Redirecionamento inteligente

### Validações
- **Email**: Formato válido e obrigatório
- **Senha**: Mínimo 6 caracteres, maiúscula, minúscula e número
- **Nome**: 2-100 caracteres, obrigatório
- **CPF**: Validação completa (opcional)
- **Telefone**: Formato válido (opcional)
- **Data de nascimento**: Idade mínima 13 anos (opcional)

### UI/UX
- Design moderno e limpo
- Responsivo para mobile e desktop
- Animações suaves
- Feedback visual
- Loading states
- Error handling

## 🎯 Estrutura do Projeto

```
Frontend/
├── src/
│   ├── components/
│   │   ├── ui/                 # Componentes reutilizáveis
│   │   └── ProtectedRoute.jsx  # Rota protegida
│   ├── contexts/
│   │   └── AuthContext.jsx    # Context de autenticação
│   ├── pages/
│   │   ├── Login.jsx          # Página de login
│   │   ├── Register.jsx       # Página de cadastro
│   │   └── Dashboard.jsx      # Dashboard do usuário
│   ├── services/
│   │   ├── api.js             # Configuração do Axios
│   │   ├── authService.js     # Serviços de autenticação
│   │   └── usuarioService.js  # Serviços de usuário
│   ├── utils/
│   │   └── cn.js              # Utilitário para classes CSS
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Ponto de entrada
│   └── index.css              # Estilos globais
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## 🔒 Segurança

- **Tokens JWT**: Armazenados no localStorage
- **Rotas protegidas**: Middleware de autenticação
- **Validações**: Client-side e server-side
- **HTTPS**: Recomendado para produção
- **CORS**: Configurado no backend

## 📱 Responsividade

O design é totalmente responsivo e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Customização

### Cores
As cores podem ser customizadas no `tailwind.config.js`:
- Primary: Azul (#3b82f6)
- Secondary: Cinza (#64748b)
- Success: Verde (#10b981)
- Error: Vermelho (#ef4444)

### Componentes
Todos os componentes UI estão em `src/components/ui/` e podem ser customizados conforme necessário.

## 🚀 Deploy

Para fazer deploy em produção:

1. **Build do projeto:**
```bash
npm run build
```

2. **Os arquivos estarão na pasta `dist/`**

3. **Configure o servidor web** (Nginx, Apache, etc.) para servir os arquivos estáticos

4. **Configure as variáveis de ambiente** no servidor

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
