import { useState } from 'react'
import api from '@/services/axiosConfig'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useNavigate } from 'react-router-dom'
import InputField from '@/components/InputField'
import Button from '@/components/Button'

const FuncaoCreatePage = () => {
  const navigate = useNavigate()
  const [funcao, setFuncao] = useState('')
  const [setor, setSetor] = useState('')
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  const salvar = async () => {
    try {
      await api.post('/funcoes', { funcao, setor })
      setMensagemSucesso('Função criada com sucesso!')
      setMensagemErro('')
      setFuncao('')
      setSetor('')
    } catch {
      setMensagemErro('Erro ao criar função.')
      setMensagemSucesso('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-md w-full">
            <h1 className="text-2xl font-bold text-blue-800 text-center">
              Criar Função
            </h1>

            <InputField
              label="Função"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
            />
            <InputField
              label="Setor"
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
            />

            <Button onClick={salvar} className="w-full">
              Salvar
            </Button>

            {mensagemSucesso && (
              <p className="text-green-600 text-sm text-center">{mensagemSucesso}</p>
            )}
            {mensagemErro && (
              <p className="text-red-500 text-sm text-center">{mensagemErro}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default FuncaoCreatePage
