import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, CreditCard, Shield, Star, Users, Crown, Sparkles, Sun, Moon } from 'lucide-react';
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
          <p className="text-hemera-blue-700 font-light mt-2">Crie sua conta para reservar com facilidade</p>
        </div>
      </header>

      {/* Register Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-sm border border-hemera-blue-100 bg-white">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-light text-hemera-navy-900 font-display">
                Cadastre-se
              </CardTitle>
              <CardDescription className="text-hemera-blue-700 font-light">
                Informe seus dados para criar sua conta
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="form-group md:col-span-2">
                    <label htmlFor="nome" className="form-label text-hemera-navy-900 font-light">
                      Nome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <Input
                        id="nome"
                        type="text"
                        placeholder="Seu nome completo"
                        className="pl-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
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
                      <p className="form-error text-hemera-gold-600">{errors.nome.message}</p>
                    )}
                  </div>

                  {/* Pronome */}
                  <div className="form-group">
                    <label htmlFor="pronome" className="form-label text-hemera-navy-900 font-light">
                      Forma de tratamento
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <select
                        id="pronome"
                        className="form-input pl-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
                        {...register('pronome')}
                      >
                        <option value="">Selecione uma forma</option>
                        <option value="Ele/Dele">Ele/Dele</option>
                        <option value="Ela/Dela">Ela/Dela</option>
                        <option value="Elu/Delu">Elu/Delu</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group md:col-span-2">
                    <label htmlFor="email" className="form-label text-hemera-navy-900 font-light">
                      Email *
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

                  {/* Telefone */}
                  <div className="form-group">
                    <label htmlFor="telefone" className="form-label text-hemera-navy-900 font-light">
                      Telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="pl-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
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
                      <p className="form-error text-hemera-gold-600">{errors.telefone.message}</p>
                    )}
                  </div>

                  {/* Data de Nascimento */}
                  <div className="form-group">
                    <label htmlFor="data_nascimento" className="form-label text-hemera-navy-900 font-light">
                      Data de nascimento
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <Input
                        id="data_nascimento"
                        type="date"
                        className="pl-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
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
                      <p className="form-error text-hemera-gold-600">{errors.data_nascimento.message}</p>
                    )}
                  </div>

                  {/* CPF */}
                  <div className="form-group">
                    <label htmlFor="cpf" className="form-label text-hemera-navy-900 font-light">
                      CPF
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <Input
                        id="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        className="pl-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
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
                      <p className="form-error text-hemera-gold-600">{errors.cpf.message}</p>
                    )}
                  </div>

                  {/* Senha */}
                  <div className="form-group">
                    <label htmlFor="senha" className="form-label text-hemera-navy-900 font-light">
                      Senha *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <Input
                        id="senha"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-12 pr-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
                        error={!!errors.senha}
                        {...register('senha', {
                          required: 'Senha é obrigatória',
                          minLength: {
                            value: 6,
                            message: 'Senha deve ter pelo menos 6 caracteres'
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: 'Senha deve conter letra maiúscula, minúscula e número'
                          }
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 hover:text-hemera-blue-600 transition-colors"
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

                  {/* Confirmar Senha */}
                  <div className="form-group">
                    <label htmlFor="confirmarSenha" className="form-label text-hemera-navy-900 font-light">
                      Confirmar senha *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 h-5 w-5" />
                      <Input
                        id="confirmarSenha"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        className="pl-12 pr-12 h-12 text-base border-hemera-blue-200 focus:border-hemera-gold-400 focus:ring-hemera-gold-200"
                        error={!!errors.confirmarSenha}
                        {...register('confirmarSenha', {
                          required: 'Confirmação de senha é obrigatória',
                          validate: (value) =>
                              value === password || 'As senhas não coincidem'
                        })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hemera-blue-400 hover:text-hemera-blue-600 transition-colors"
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
                      <p className="form-error text-hemera-gold-600">{errors.confirmarSenha.message}</p>
                    )}
                  </div>
                </div>

                {/* Erro geral */}
                {errors.root && (
                    <div className="bg-hemera-gold-50 border border-hemera-gold-200 rounded-lg p-4 text-center">
                      <p className="text-hemera-gold-600 text-sm">{errors.root.message}</p>
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
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
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

export default Register;
