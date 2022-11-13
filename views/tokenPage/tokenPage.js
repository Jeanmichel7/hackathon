import { getEthBalance, gasOnGoerli, smartContractTemplate } from '../../controllers/commun.js';
import { createERC721, createERC1155, createERC20, createERC20M } from '../../controllers/token.js';


/* ********************************************* */
/*                                               */
/*                Define function                */
/*                                               */
/* ********************************************* */

async function displayTemplate() {
  let allTemplate = await smartContractTemplate();
  allTemplate = allTemplate.items;
  // templates = allTemplate;
  // console.log(allTemplate)

  for (const elem in allTemplate) {
    // console.log("elem : ", elem);
    document.getElementById("display-all-template").innerHTML +=
      `
    <div class="col-auto">
      <div class="card template-list__item">
        <div class="card-body">
          <h5 class="card-title">${allTemplate[elem].name}</h5>
          <p class="card-text">${allTemplate[elem].shortDescription}</p>
          <a href="#form-create-token" id="btn-form-create-token${elem}" class="btn btn-primary">
            Create ${allTemplate[elem].name.split(" ")[0]}
          </a>
          </div>
      </div>
    </div>
    `
  }
  return allTemplate;
}

function displayForm(template) {
  for (let elem in template) {
    let str = "btn-form-create-token" + elem;
    const btnForm = document.getElementById(str);
    btnForm.addEventListener("click", () => {
      displayFormCreateToken(template, elem);
      return elem;
    });
  }
}


async function displayFormCreateToken(templates, index) {
  console.log("templates : ", templates);
  document.getElementById("display-form-create-token").innerHTML =
    `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Create your ${templates[index].name} token</h5>
      <p>${templates[index].description}</p>
      <form id="form-create-token" enctype="multipart/form-data" method="post">
        <div class="row">
          <div class="col-md-6">
            <label for="token-name">Token name</label>
            <input type="text" class="form-control" id="token-name" placeholder="Enter token name" placeholder="Token Name">
          </div>
          <div class="col-auto">
            <label for="token-symbol">Token symbol</label>
            <input type="text" class="form-control" id="token-symbol" placeholder="Enter token symbol" placeholder="TNX">
          </div>
          <div class="col-auto">
            <label for="token-decimals">Token decimals</label>
            <input type="number" class="form-control" id="token-decimals" placeholder="Enter token decimals" placeholder=18>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <label for="token-description">Token description (optionnal)</label>
            <textarea class="form-control" id="token-description" placeholder="Enter token description" rows="3"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <label for="token-network">Network</label>
            <select id="token-network" class="form-select" aria-label="Network">
              <option selected value="ethereum-goerli">ethereum-goerli</option>
              <option value="binance-testnet">binance-testnet</option>
              <option value="polygon-mumbai">polygon-mumbai</option>
              <option value="avalanche-fuji">avalanche-fuji</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="token-signer">signerWallet</label>
            <input type="text" class="form-control" id="token-signer" value="${localStorage.getItem('walletAddress')}">
          </div>
        </div>

        <div class="form-group">
          <label for="token-template-id">Template Id</label>
          <input type="text" class="form-control" id="token-template-id" value="${templates[index].id}">
        </div>

        <div class="form-group">
          <label for="token-supply">Token supply</label>
          <input type="number" class="form-control" id="token-supply" placeholder="Enter token supply" value=10000>
        </div>


        <button type="button" id="btn-create-token${index}" class="btn btn-primary" 
        data-bs-toggle="modal" data-bs-target="#modal-create-token">
          Create token
        </button>
      </form>
    </div>
  </div>
  `




  /* get gas to display on modal confirmation */
  let gasFee = await gasOnGoerli();
  console.log("gasFee : ", gasFee);

  const modelGasFeeMin = document.getElementById("modal-gas-fee-min");
  modelGasFeeMin.innerHTML = parseFloat(gasFee.low.maxFeePerGas / 1000000000000).toPrecision(3).toString()
    + gasFee.network.slice(0, 3).toUpperCase();

  const modelGasFeeAvg = document.getElementById("modal-gas-fee-avg");
  modelGasFeeAvg.innerHTML = parseFloat(gasFee.average.maxFeePerGas / 1000000000000).toPrecision(3).toString()
    + gasFee.network.slice(0, 3).toUpperCase();

  const modelGasFeeMax = document.getElementById("modal-gas-fee-max");
  modelGasFeeMax.innerHTML = parseFloat(gasFee.fast.maxFeePerGas / 1000000000000).toPrecision(3).toString()
    + gasFee.network.slice(0, 3).toUpperCase();;





  const btnValideCreateToken = document.getElementById("valid-create-token");
  btnValideCreateToken.addEventListener("click", async () => {
    let formName = document.getElementById("token-name").value.toString();
    let formNetwork = document.getElementById("token-network").value.toString();
    let formSignerWallet = document.getElementById("token-signer").value.toString();
    let formTemplateId = document.getElementById("token-template-id").value.toString();
    let formDescription = document.getElementById("token-description").value.toString();
    let formSupply = document.getElementById("token-supply").value.toString();
    let formSymbol = document.getElementById("token-symbol").value.toString();
    let formDecimals = document.getElementById("token-decimals").value.toString();

    if (formName === "" || formNetwork === "" || formSignerWallet === "" || formTemplateId === "" || formDescription === "" || formSupply === "" || formSymbol === "" || formDecimals === "") {
      alert("Please fill all the fields");
    }

    // const formData = new FormData();
    // formData.append("name", document.getElementById("token-name").value);
    // formData.append("network", document.getElementById("token-network").value);
    // formData.append("signerWallet", document.getElementById("token-signer").value);
    // formData.append("templateId", document.getElementById("token-template-id").value);
    // formData.append("description", document.getElementById("token-description").value);

    // formData.append("supply", document.getElementById("token-supply").value);
    // formData.append("symbol", document.getElementById("token-symbol").value);
    // formData.append("decimals", document.getElementById("token-decimals").value);



    const formData = {
      name: document.getElementById("token-name").value.toString(),
      network: document.getElementById("token-network").value.toString(),
      signerWallet: document.getElementById("token-signer").value.toString(),
      templateId: document.getElementById("token-template-id").value.toString(),
      description: document.getElementById("token-description").value.toString(),
      supply: document.getElementById("token-supply").value.toString(),
      symbol: document.getElementById("token-symbol").value.toString(),
      decimals: document.getElementById("token-decimals").value.toString(),
    }


    /* call appropiate template */
    let res;
    if (formData.templateId === "sct_e851adefe4494fc991207b2c37ed8a83")
      res = await createERC721(formData);
    else if (formData.templateId === "sct_d4c1d5f2ed6f44d185bfb60eee2dbcaf")
      res = await createERC1155(formData);
    else if (formData.templateId === "sct_81d50607677241beac764bfadd31a3a7")
      res = await createERC20(formData);
    else if (formData.templateId === "sct_82bde80651bd40cca12f044cb80821bc")
      res = await createERC20M(formData);
    else
      res = null;


    console.log("res : ", res);
    if (res == null) {
      document.getElementById("display-form-create-token").innerHTML = "Template non implemented (la flemme de faire les autres et puis c'est quoi cette histoire de child?)";
      return;
    }

    if (res.status === 201) {
      document.getElementById("display-form-create-token").innerHTML = `
      <p class="msg-succes">Token Created : 
        <a href="https://goerli.etherscan.io/tx/${res.data.transaction.transactionHash}">
          https://goerli.etherscan.io/tx/${res.data.transaction.transactionHash}
        </a>
      </p>`
      console.log(res.data);
    }
    else {
      document.getElementById("display-form-create-token").innerHTML += `
      <p class="msg-error">Error : ${res.response.data.message} </p> 
      <p class="msg-error">${res.response.data.context.reason} : ${res.response.data.context.value}</p>
      `
      window.scrollTo(0, document.body.scrollHeight);
      // console.log(res);
    }
  });
}








/* ********************************************* */
/*                                               */
/*                 Call function                 */
/*                                               */
/* ********************************************* */


getEthBalance(localStorage.getItem('ethBalance'));
let template = await displayTemplate();
displayForm(template);
