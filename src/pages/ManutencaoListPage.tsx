import { useEffect, useState } from "react";
import { getManutencao } from "../services/manutencao";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const ManutencaoListPage = () => {
  const [manutencoes, setManutencoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManutencoes = async () => {
      const data = await getManutencao();
      setManutencoes(data);
    };
    fetchManutencoes();
  }, []);

  const handleCreate = () => {
    navigate("/manutencoes/novo");
  };

  const handleEdit = (id: number) => {
    navigate(`/manutencoes/${id}/editar`);
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Serviço", accessor: "Serviço" },
    { label: "Status", accessor: "status" },
    {
      label: "Ações",
      accessor: "acoes",
      render: (item: any) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(item.id)}>Editar</Button>
          {/*<Button variant="danger">Excluir</Button> */}
          <Button>Excluir</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manutenções</h1>
        <Button onClick={handleCreate}>Nova Manutenção</Button>
      </div>
      <DataTable data={manutencoes} columns={columns} />
    </div>
  );
};

export default ManutencaoListPage;
