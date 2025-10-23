import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, CreditCard, Shield, Star, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm();

  const password = watch('senha');

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
      const result = await registerUser(data);
      
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

  // Validação de CPF
  const validateCPF = (cpf) => {
    if (!cpf) return true; // CPF é opcional
    
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return 'CPF deve ter 11 dígitos';
    
    // Verificar se não são todos iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return 'CPF inválido';
    
    // Validação básica do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return 'CPF inválido';
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return 'CPF inválido';
    
    return true;
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
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Crie sua Conta
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Junte-se ao nosso sistema e gerencie usuários de forma profissional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Shield className="h-5 w-5 mr-2" />
                <span>Segurança Garantida</span>
              </div>
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <Star className="h-5 w-5 mr-2" />
                <span>Interface Intuitiva</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Register Form */}
      <div className="relative -mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="animate-fade-in shadow-2xl border-0">
              <CardHeader className="space-y-1 text-center pb-6">
                <CardTitle className="text-3xl font-bold text-secondary-900">
                  Cadastro
                </CardTitle>
                <CardDescription className="text-lg text-secondary-600">
                  Preencha os dados abaixo para criar sua conta
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="form-group md:col-span-2">
                      <label htmlFor="nome" className="form-label text-secondary-700">
                        Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Seu nome completo"
                          className="pl-12 h-12 text-base"
                          error={!!errors.nome}
                          {...register('nome', {
                            required: 'Nome é obrigatório',
                            minLength: {
                              value: 2,
                              message: 'Nome deve ter pelo menos 2 caracteres'
                            },
                            maxLength: {
                              value: 100,
                              message: 'Nome deve ter no máximo 100 caracteres'
                            }
                          })}
                        />
                      </div>
                      {errors.nome && (
                        <p className="form-error">{errors.nome.message}</p>
                      )}
                    </div>

                    {/* Pronome */}
                    <div className="form-group">
                      <label htmlFor="pronome" className="form-label text-secondary-700">
                        Pronome
                      </label>
                      <Input
                        id="pronome"
                        type="text"
                        placeholder="ele/dele, ela/dela, etc."
                        className="h-12 text-base"
                        error={!!errors.pronome}
                        {...register('pronome', {
                          maxLength: {
                            value: 20,
                            message: 'Pronome deve ter no máximo 20 caracteres'
                          }
                        })}
                      />
                      {errors.pronome && (
                        <p className="form-error">{errors.pronome.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label text-secondary-700">
                        Email *
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

                    {/* Telefone */}
                    <div className="form-group">
                      <label htmlFor="telefone" className="form-label text-secondary-700">
                        Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                        <Input
                          id="telefone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="pl-12 h-12 text-base"
                          error={!!errors.telefone}
                          {...register('telefone', {
                            pattern: {
                              value: /^[\d\s\(\)\-\+]+$/,
                              message: 'Telefone deve conter apenas números, espaços, parênteses, hífens e +'
                            },
                            maxLength: {
                              value: 20,
                              message: 'Telefone deve ter no máximo 20 caracteres'
                            }
                          })}
                        />
                      </div>
                      {errors.telefone && (
                        <p className="form-error">{errors.telefone.message}</p>
                      )}
                    </div>

                    {/* Data de Nascimento */}
                    <div className="form-group">
                      <label htmlFor="data_nascimento" className="form-label text-secondary-700">
                        Data de Nascimento
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                        <Input
                          id="data_nascimento"
                          type="date"
                          className="pl-12 h-12 text-base"
                          error={!!errors.data_nascimento}
                          {...register('data_nascimento', {
                            validate: (value) => {
                              if (!value) return true; // Data é opcional
                              
                              const birthDate = new Date(value);
                              const today = new Date();
                              const age = today.getFullYear() - birthDate.getFullYear();
                              
                              if (age < 13) return 'Usuário deve ter pelo menos 13 anos';
                              if (age > 120) return 'Data de nascimento inválida';
                              
                              return true;
                            }
                          })}
                        />
                      </div>
                      {errors.data_nascimento && (
                        <p className="form-error">{errors.data_nascimento.message}</p>
                      )}
                    </div>

                    {/* CPF */}
                    <div className="form-group">
                      <label htmlFor="cpf" className="form-label text-secondary-700">
                        CPF
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                        <Input
                          id="cpf"
                          type="text"
                          placeholder="000.000.000-00"
                          className="pl-12 h-12 text-base"
                          error={!!errors.cpf}
                          {...register('cpf', {
                            validate: validateCPF,
                            pattern: {
                              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
                              message: 'CPF deve ter formato válido (000.000.000-00 ou 00000000000)'
                            }
                          })}
                        />
                      </div>
                      {errors.cpf && (
                        <p className="form-error">{errors.cpf.message}</p>
                      )}
                    </div>

                    {/* Senha */}
                    <div className="form-group">
                      <label htmlFor="senha" className="form-label text-secondary-700">
                        Senha *
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
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                              message: 'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'
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

                    {/* Confirmar Senha */}
                    <div className="form-group">
                      <label htmlFor="confirmarSenha" className="form-label text-secondary-700">
                        Confirmar Senha *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-5 w-5" />
                        <Input
                          id="confirmarSenha"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirme sua senha"
                          className="pl-12 pr-12 h-12 text-base"
                          error={!!errors.confirmarSenha}
                          {...register('confirmarSenha', {
                            required: 'Confirmação de senha é obrigatória',
                            validate: (value) =>
                              value === password || 'As senhas não coincidem'
                          })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmarSenha && (
                        <p className="form-error">{errors.confirmarSenha.message}</p>
                      )}
                    </div>
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
                      {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Link para login */}
            <div className="text-center mt-8">
              <p className="text-white/80 text-lg">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-white hover:text-primary-200 transition-colors underline"
                >
                  Faça login aqui
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

export default Register;
