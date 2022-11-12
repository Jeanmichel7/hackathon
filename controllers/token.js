import {http} from './commun.js';

export async function smartContractTemplate () {
  const response = await http.get('/smart-contract-template');
  return response.data;
}

export async function createERC721(formData) {
  console.log("create erc721");
  // console.log("template id : ", templateId);

  // console.log(formData);
  // console.log("params : ", typeof(formData.get("params")));
  // console.log("type name : ", typeof(formData.get("params")[0]));

  // const params = [];
  // params.push(formData.get("supply"));
  // params.push(formData.get("name"));
  // params.push(formData.get("symbol"));
  // params.push(formData.get("decimals"));
  // params.push(formData.get("signerWallet"));

  // formData.append("params", params);
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
    ]
  }

  const res = await http.post('/smart-contract/from-template', body)
  .catch(function (error) {
    // console.log("lerreur est la : ", error);
    return error;
  });
  return res;
}

export async function createERC1155(formData) {
  console.log("create erc1155");
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

export async function createERC20(formData) {
  console.log("create erc20");
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

export async function createERC20M(formData) {
  console.log("create erc20mintable");
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