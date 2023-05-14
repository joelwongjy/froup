import config from 'config';

import { Module } from 'types/modules';
import { api } from 'utils/apiUtils';

export const getAllModulesSummary = async (): Promise<Module[] | []> => {
  const response = await api.get(`${config.academicYear}/moduleList.json`);
  return response.data as Module[] | [];
};
