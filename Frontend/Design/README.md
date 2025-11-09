# Hemera Luxe Haven – Frontend Design

Frontend estático com Tailwind e Web Components para o site do Hemera, incluindo autenticação com a API.

## Estrutura

```
Design/
├── components/
│   ├── header.js
│   ├── footer.js
│   └── auth-modal.js
├── utils/
│   └── session.js
├── index.html
├── style.css
└── script.js
```

## Rodando localmente

- Requer Python instalado para o servidor estático simples.
- Execute na pasta `Design`:

```
python -m http.server 3002
```

- Acesse `http://localhost:3002/`.

## Configuração da API

- Ajuste a base da API em `index.html`:

```
<script>
  window.HEMERA_API_URL = 'http://localhost:3000/api';
</script>
```

### Endpoints esperados

- `POST /api/auth/login` → `{ email, senha }`
- `POST /api/auth/register` → `{ nome, email, senha }`

## Sessão

- `utils/session.js` expõe `window.hemeraAuth`:
  - `isLoggedIn()`, `token()`, `user()`
  - `setSession(token, user)`, `logout()`
  - Eventos: `auth:session-set`, `auth:logout`

## Componentes

- `components/header.js`: header responsivo com botões de Login/Cadastro que abrem o modal.
- `components/auth-modal.js`: tabs para Entrar/Criar conta; integra com a API; emite `auth:login-success`/`auth:register-success`.
- `components/footer.js`: rodapé com links e social.

## Personalização visual

- Estilos adicionais em `style.css` complementam Tailwind.

## Observações

- Para usar com o backend, suba a API e ajuste `HEMERA_API_URL`.
- Este frontend é independente do app React/Vite em `Frontend/`.

