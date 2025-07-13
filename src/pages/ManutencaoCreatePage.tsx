import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createManutencao } from "../services/manutencao";
import Button from "../components/Button";

const ManutencaoCreatePage = () => {
  const [servico, setServico] = useState("");
  const [funcionarios, setFuncionarios] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      servico,
      funcionarios,
    };

    await createManutencao(data);
    navigate("/manutencoes");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nova manotenção</h1>
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
          <label className="block font-medium">funcionarios</label>
          <input
            type="text"
            value={funcionarios}
            onChange={(e) => setFuncionarios(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};

export default ManutencaoCreatePage;
