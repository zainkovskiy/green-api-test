const BASE_URL = 'https://api.green-api.com';

export const buildUrl = (
  idInstance: string,
  apiTokenInstance: string,
  action: string,
  params?: string,
) => {
  return `${BASE_URL}/waInstance${idInstance}/${action}/${apiTokenInstance}${params ?? ''}`;
};
