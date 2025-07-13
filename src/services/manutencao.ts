import api from "./axiosConfig";

export const getManutencao = async () => {
  const response = await api.get("/manutencao");
  return response.data;
};

export const getManutencaoById = async (id: number) => {
  const response = await api.get(`/manutencao/${id}`);
  return response.data;
};

export const createManutencao = async (data: any) => {
  const response = await api.post("/manutencao", data);
  return response.data;
};

export const updateManutencao = async (id: number, data: any) => {
  const response = await api.patch(`/manutencao/${id}`, data);
  return response.data;
};

export const deleteManutencao = async (id: number) => {
  const response = await api.delete(`/manutencao/${id}`);
  return response.data;
};

