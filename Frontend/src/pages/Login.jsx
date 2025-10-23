import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Shield, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, location]);

  const onSubmit = async (data) => {
    try {
      clearErrors();
      const result = await login(data.email, data.senha);
      
      if (result.success) {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Erro inesperado. Tente novamente.'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white mb-16 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sistema de Usuários
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Gerencie usuários de forma eficiente e segura com nossa plataforma completa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Shield className="h-5 w-5 mr-2" />
                <span>Segurança Avançada</span>
              </div>
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Star className="h-5 w-5 mr-2" />
                <span>Interface Moderna</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative -mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="animate-fade-in shadow-2xl border-0">
              <CardHeader className="space-y-1 text-center pb-6">
                <CardTitle className="text-3xl font-bold text-secondary-900">
                  Bem-vindo de volta!
                </CardTitle>
                <CardDescription className="text-lg text-secondary-600">
                  Faça login em sua conta para continuar
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label text-secondary-700">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-12 h-12 text-base"
                        error={!!errors.email}
                        {...register('email', {
                          required: 'Email é obrigatório',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Senha */}
                  <div className="form-group">
                    <label htmlFor="senha" className="form-label text-secondary-700">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                      <Input
                        id="senha"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Sua senha"
                        className="pl-12 pr-12 h-12 text-base"
                        error={!!errors.senha}
                        {...register('senha', {
                          required: 'Senha é obrigatória',
                          minLength: {
                            value: 6,
                            message: 'Senha deve ter pelo menos 6 caracteres'
                          }
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.senha && (
                      <p className="form-error">{errors.senha.message}</p>
                    )}
                  </div>

                  {/* Erro geral */}
                  {errors.root && (
                    <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                      {errors.root.message}
                    </div>
                  )}

                  {/* Botões */}
                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>

                    <div className="text-center">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Link para cadastro */}
            <div className="text-center mt-8">
              <p className="text-white/80 text-lg">
                Não tem uma conta?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-white hover:text-primary-200 transition-colors underline"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl mb-4">Sistema de Usuários</h3>
          <p className="text-white/80 mb-2">Gerencie usuários de forma eficiente e segura</p>
          <p className="text-white/80">Desenvolvido com React + Node.js</p>
          <p className="text-primary-400 mt-6">© 2025 Sistema de Usuários. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
