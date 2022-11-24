import {http} from './commun.js.js';

export async function createERC721(formData) {
  let body = { 
    "network": formData.network,
    "signerWallet": formData.signerWallet,
    "templateId": formData.templateId,
    "name": formData.name,
    "description": formData.description,
    "params": [
      formData.supply,
      formData.name,
      formData.symbol,
      formData.decimals,
      formData.signerWallet
    ],
    // "speed": null,
    // "gasLimit": null,
    // "customGas": {},
    // "nonce": 0,
    // "value": null
  }
  const res = await http.post('/smart-contract/from-template', body)
  .catch(function (error) { return error; });
  return res;
}

export async function createERC1155(formData) {
  let body = { 
    "network": formData.network,
    "signerWallet": formData.signerWallet,
    "templateId": formData.templateId,
    "name": formData.name,
    "description": formData.description,
    "params": [
      formData.supply,
      formData.name,
      formData.decimals,
      formData.signerWallet,
    ]
  }
  const res = await http.post('/smart-contract/from-template', body)
  .catch(function (error) { return error; });
  return res;
}

export async function createERC20(formData) {
  let body = { 
    "network": formData.network,
    "signerWallet": formData.signerWallet,
    "templateId": formData.templateId,
    "name": formData.name,
    "description": formData.description,
    "params": [
      formData.name,
      formData.symbol,
      formData.supply,
      formData.signerWallet,
    ],
    // "speed": null,
    // "gasLimit": null,
    // "customGas": {},
    // "nonce": 0,
    // "value": null
  }
  const res = await http.post('/smart-contract/from-template', body)
  .catch(function (error) { return error; });
  return res;
}

export async function createERC20M(formData) {
  let body = { 
    "network": formData.network,
    "signerWallet": formData.signerWallet,
    "templateId": formData.templateId,
    "name": formData.name,
    "description": formData.description,
    "params": [
      formData.supply,
      formData.name,
      formData.decimals,
      formData.signerWallet,
    ]
  }
  const res = await http.post('/smart-contract/from-template', body)
  .catch(function (error) {
    console.log("error : ", error);
    return error;
  });
  return res;
}