import {http} from './commun.js';

export async function smartContractTemplate () {
  const response = await http.get('/smart-contract-template');
  return response.data;
}