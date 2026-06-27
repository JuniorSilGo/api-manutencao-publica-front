import api from "./axiosConfig";

export const getFuncoes = async () => {
  const response = await api.get("/funcoes");
  return response.data;
};

export const getFuncaoById = async (id: number) => {
  const response = await api.get(`/funcoes/${id}`);
  return response.data;
};

export const createFuncao = async (data: any) => {
  const response = await api.post("/funcoes", data);
  return response.data;
};

export const updateFuncao = async (id: number, data: any) => {
  const response = await api.patch(`/funcoes/${id}`, data);
  return response.data;
};

export const deleteFuncao = async (id: number) => {
  const response = await api.delete(`/funcoes/${id}`);
  return response.data;
};

export const ativarFuncao = async (id: number) => {
  const response = await api.patch(`/funcoes/${id}/ativar`);
  return response.data;
};

export const desativarFuncao = async (id: number) => {
  const response = await api.patch(`/funcoes/${id}/desativar`);
  return response.data;
};

export const getFuncaoFuncionarios = async (id: number) => {
  const response = await api.get(`/funcoes/${id}/funcionarios`);
  return response.data;
};

export const getFuncaoServicos = async (id: number) => {
  const response = await api.get(`/funcoes/${id}/servicos`);
  return response.data;
};
