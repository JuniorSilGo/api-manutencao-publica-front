import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/contexts/AuthContext'
import InputField from '@/components/InputField'
import Button from '@/components/Button'
import SelectFuncao from '@/components/SelectFuncao'

const FuncionarioCreatePage = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [idFuncao, setIdFuncao] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const navigate = useNavigate()
  const { token } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!nome || !email || !senha || !idFuncao) {
      setErro('Todos os campos são obrigatórios')
      return
    }

    try {
      await axios.post(
        '/funcionarios',
        {
          nome,
          email,
          senha,
          id_funcao: Number(idFuncao),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setSucesso('Funcionário criado com sucesso!')
      setTimeout(() => navigate('/funcionarios'), 1500)
    } catch (error: any) {
      console.error('Erro ao criar funcionário:', error)
      setErro(error.response?.data?.message || 'Erro ao criar funcionário')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md w-full bg-white p-6 rounded-xl shadow-md"
          >
            <h1 className="text-2xl font-bold text-blue-800 text-center">
              Cadastrar Funcionário
            </h1>

            <InputField
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <InputField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <label className="text-sm font-semibold text-gray-700">Função</label>
            <SelectFuncao
              value={Number(idFuncao)}
              onChange={(id) => setIdFuncao(String(id))}
            />

            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            {sucesso && <p className="text-green-600 text-sm">{sucesso}</p>}

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default FuncionarioCreatePage
