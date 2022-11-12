import {http} from './commun.js';

/* Smart Contract */
export async function getAllSc(network) {
  const response = await http.get('/smart-contract/' + network);
  return response.data;
}

export async function getScFunctions(network, scAddress) {
  const response = await http.get('/smart-contract/' + network + '/' + scAddress + '/available-functions');
  return response.data;
}

export async function getSC() {
  try {
    const response = await http.get('/smart-contract/' + network + '/' + scAddress);
    console.log("res getSC : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}

// export async function deploySmartContractFromTemplate() {
//   try {
//     const response = await http.post('/smart-contract/from-template', {
//       "params": {
//         "param1": "value1",
//         "param2": "value2"
//       }
//     });
//     console.log("res postSc : ", response.data);
//   }
//   catch (error) {
//     console.error(error);
//   }
// }
