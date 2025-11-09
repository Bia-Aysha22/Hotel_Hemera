// Utilitário de sessão Hemera
(function() {
  const hemeraAuth = {
    isLoggedIn: () => !!localStorage.getItem('hemera_token'),
    token: () => localStorage.getItem('hemera_token'),
    user: () => {
      try { return JSON.parse(localStorage.getItem('hemera_user') || 'null'); } catch { return null; }
    },
    setSession: (token, user) => {
      if (token) localStorage.setItem('hemera_token', token);
      if (user) localStorage.setItem('hemera_user', JSON.stringify(user));
      window.dispatchEvent(new CustomEvent('auth:session-set', { detail: { token, user } }));
    },
    clearSession: () => {
      localStorage.removeItem('hemera_token');
      localStorage.removeItem('hemera_user');
    },
    logout: () => {
      hemeraAuth.clearSession();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  };
  window.hemeraAuth = hemeraAuth;
})();

