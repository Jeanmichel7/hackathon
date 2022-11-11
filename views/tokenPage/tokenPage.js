import {getEthBalance, gasOnGoerli} from '../../controllers/commun.js';
import {createToken, smartContractTemplate} from '../../controllers/token.js';


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

async function displayForm (template) {
  for(let elem in template) {
    let str = "btn-form-create-token" + elem;
    const btnForm = document.getElementById(str);
    btnForm.addEventListener("click", async () => {
      await displayFormCreateToken(template, elem);
      return elem;
    });
  }
}

async function displayFormCreateToken(templates, index) {
  document.getElementById("display-form-create-token").innerHTML = 
  `
  <div class="card">
    <div class="card-body">
      <h5 id="form-create-token" class="card-title">Create your ${templates[index].name} token</h5>
      <form>
        <div class="form-group
          <label for="token-name">Token name</label>
          <input type="text" class="form-control" id="token-name" placeholder="Enter token name">
        </div>
        <div class="form-group">
          <label for="token-symbol">Token symbol</label>
          <input type="text" class="form-control" id="token-symbol" placeholder="Enter token symbol">
        </div>
        <div class="form-group">
          <label for="token-decimals">Token decimals</label>
          <input type="number" class="form-control" id="token-decimals" placeholder="Enter token decimals">
        </div>
        <div class="form-group">
          <label for="token-supply">Token supply</label>
          <input type="number" class="form-control" id="token-supply" placeholder="Enter token supply">
        </div>
        <button type="button" id="btn-create-token" class="btn btn-primary" 
        data-bs-toggle="modal" data-bs-target="#modal-create-token">
          Create token
        </button>
      </form>
    </div>
  </div>
  `
  const btnValideCreateToken = document.getElementById("valid-create-token");
  btnValideCreateToken.addEventListener("click", async () => {
    console.log("elem : ", index);
    let res = await validateCreatToken(template, index);
    console.log("res : ", res);
    if (res.status === 201) { 
      document.getElementById("display-form-create-token").innerHTML = `
      <p class="msg-succes">Token Created check log</p>`;
      console.log(res.data);
    }
    else {
      document.getElementById("display-form-create-token").innerHTML += `
      <p class="msg-error"> Error : ${res.response.data.message} </p> `
      window.scrollTo(0, document.body.scrollHeight);
      // console.log(res);
    }
  });
}




async function validateCreatToken(templates, elem) {
  const modelGasFee = document.getElementById("modal-gas-fee");
  let gasFee = await gasOnGoerli();
  console.log("gasFee : ", gasFee);

  modelGasFee.innerHTML = gasFee.average.maxFeePerGas;
  let ret = createToken(templates[elem].id);
  return ret;
}




/* ********************************************* */
/*                                               */
/*                 Call function                 */
/*                                               */
/* ********************************************* */


getEthBalance(localStorage.getItem('ethBalance'));
let template      = await displayTemplate();
displayForm(template);
