import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getManutencaoById,
  updateManutencao,
} from "../services/manutencao";
import Button from "../components/Button";// uso do export default está dando erro no uso das { }, por isso removi as chaves

const ManutencaoUpdatePage = () => {
  const [servico, setServico] = useState("");
  const [funcionarios, setFuncionarios] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchManutencao = async () => {
      if (!id) return;
      const data = await getManutencaoById(Number(id));
      setServico(data.nome || "");
      setFuncionarios(data.modelo || "");
    };
    fetchManutencao();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      servico,
      funcionarios,
    };
    await updateManutencao(Number(id), data);
    navigate("/manutencao");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Atualizar manutencao</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Funcionarios</label>
          <input
            type="text"
            value={funcionarios}
            onChange={(e) => setFuncionarios(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
};

export default ManutencaoUpdatePage;
