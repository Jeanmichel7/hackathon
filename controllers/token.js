import {http} from './commun.js';

export async function smartContractTemplate () {
  const response = await http.get('/smart-contract-template');
  return response.data;
}

export async function createToken(templateId) {
  console.log("template id : ", templateId);

  let body = { 
    "network": "ethereum-goerli",
    "signerWallet": "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8",
    "templateId": templateId,
    "name": "DemoToken",
    "description": "Our own crypto token.",
    "params": [
      "1000000",
      "DemoToken",
      "DEMO",
      "18",
      "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8"
    ]
  }

  const res = await http.post('/smart-contract/from-template', body)
  .catch(function (error) {
    console.log("lerreur est la : ", error);
    return error;
  });
  return res;
}
