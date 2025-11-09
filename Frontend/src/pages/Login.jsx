import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Shield, Star, Sun, Moon, Crown, Sparkles } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hemera-gold-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimalista */}
      <header className="border-b border-hemera-blue-100">
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="font-display text-4xl font-light text-hemera-navy-900">Hotel Hemera</h1>
          <p className="text-hemera-blue-700 font-light mt-2">Entre e continue sua jornada de tranquilidade</p>
        </div>
      </header>

      {/* Login Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-sm border border-hemera-blue-100 bg-white">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-light text-hemera-navy-900 font-display">
                Entrar
              </CardTitle>
              <CardDescription className="text-hemera-blue-700 font-light">
                Acesse sua conta
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label text-hemera-navy-900 font-light">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
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
                    <p className="form-error text-hemera-gold-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Senha */}
                <div className="form-group">
                  <label htmlFor="senha" className="form-label text-hemera-navy-900 font-light">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                    <Input
                      id="senha"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua senha"
                      className="pl-12 pr-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 hover:text-hemera-gold-400 transition-colors"
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
                    <p className="form-error text-hemera-gold-600">{errors.senha.message}</p>
                  )}
                </div>

                {/* Erro geral */}
                {errors.root && (
                  <div className="p-4 text-sm text-hemera-gold-600 bg-hemera-gold-50 border border-hemera-gold-200 rounded-lg">
                    {errors.root.message}
                  </div>
                )}

                {/* Botões */}
                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-light bg-hemera-gold-400 text-hemera-navy-900 hover:bg-hemera-gold-500"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                  </Button>

                  <div className="text-center">
                    <Link
                      to="/register"
                      className="text-sm text-hemera-blue-700 hover:text-hemera-gold-600 transition-colors font-light"
                    >
                      Ainda não possui uma conta? Cadastre-se
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
            </Card>
        </div>
      </div>

      {/* Footer minimalista */}
      <footer className="bg-white border-t border-hemera-blue-100 py-12 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-2xl mb-2 text-hemera-navy-900">Hotel Hemera</h3>
          <p className="text-hemera-blue-700 font-light">© 2025. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
