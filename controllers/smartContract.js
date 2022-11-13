import {http} from './commun.js';

/* Smart Contract */
export async function getAllSc(network) {
  const response = await http.get('/smart-contract/' + network);
  return response;
}

export async function getSc(network, scAddress) {
  const response = await http.get('/smart-contract/' + network + '/' + scAddress)
  .catch(function (error) {
    // console.log("lerreur est la : ", error);
    return error;
  });
  return response;
}

export async function getScFunctions(network, scAddress) {
  const response = await http.get('/smart-contract/' + network + '/' + scAddress + '/available-functions');
  return response.data;
}

export async function importSmartContract(abi, network, name, address, description) {
  const response = await http.post("https://api.starton.io/v2/smart-contract/import-existing", {
    "abi": abi,
    "network": network,
    "name": name,
    "address": address,
    "description": description
  })
  .catch(function (error) {
    return error;
  });
  return response;
}

export async function callSmartContractFunction(network, address, fctName, data) {
  const res = await http.post("/smart-contract/" + network + "/" + address + "/call", {
    "functionName": fctName,
    "params": params
  })
  .catch(function (error) { return error; });
  return res;
}

export async function readSmartContractFunction(network, address, fctName, params) {
  const res = await http.post("/smart-contract/" + network + "/" + address + "/read", {
    "functionName": fctName,
    "params": params
  })
  .catch(function (error) { return error; });
  return res;
}