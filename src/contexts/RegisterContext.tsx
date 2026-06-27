import { createContext, useContext, useState, ReactNode } from 'react';
import api from '@/services/axiosConfig';

interface RegisterContextType {
  register: (nome: string, email: string, senha: string) => Promise<void>;
  sucesso: string;
  erro: string;
  limparMensagens: () => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  const register = async (nome: string, email: string, senha: string) => {
    try {
      const response = await api.post('/auth/register', {
        nome,
        email,
        senha,
      });

      setSucesso('Usuário criado com sucesso!');
      setErro('');
    } catch (error: any) {
      console.error('Erro completo:', error.response || error.message);
      setErro(error.response?.data?.message || error.response?.data?.error || 'Erro ao criar conta');
      setSucesso('');
    }
  };

  const limparMensagens = () => {
    setErro('');
    setSucesso('');
  };

  return (
    <RegisterContext.Provider value={{ register, sucesso, erro, limparMensagens }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister deve ser usado dentro de um RegisterProvider');
  }
  return context;
};
