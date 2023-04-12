import { Module } from "../types/module";
import { api } from "../utils/apiUtils";

export const getAllModulesSummary = async (): Promise<Module[] | []> => {
  const response = await api.get("2022-2023/moduleList.json");
  return response.data as Module[] | [];
};
