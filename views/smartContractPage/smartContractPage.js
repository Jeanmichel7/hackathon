import {smartContractTemplate, checkConnection} from '../../controllers/commun.js';
import {getSc, getAllSc, getScFunctions, importSmartContract, readSmartContractFunction, callSmartContractFunction, deleteSmartContract} from '../../controllers/smartContract.js';

import {networks} from '../../controllers/commun.js';

/* ********************************************* */
/*                                               */
/*                Define function                */
/*                                               */
/* ********************************************* */

function nbParams(fct) {
  let params = fct.split('(')[1].split(')')[0].split(',');
  if (params[0] == "")
    return 0;
  return params.length;
}

function setParamsFct(fct, paramsType) {
  let params= [];
  // console.log("paramsType", paramsType);
  // console.log("length : ", paramsType.length);
 
  // const regex = /0x\w{64}/g;

  /* fill params */
  for (let i = 0; i < paramsType.length; i++) {
    if (paramsType[i] === "bytes32") {
      let inputParams = document.getElementById(`fct${paramsType[i]}`).value.toString();

      // const found = inputParams.match(regex);
      // console.log("ret found : ", found);

        /* regex check if 0x[a-z]{64} */
      if (inputParams === "ADMINROLE")
        params.push("0x0000000000000000000000000000000000000000000000000000000000000000")
      else if (inputParams === "PAUSER_ROLE")
        params.push("0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a");
      else
        params.push(ethers.utils.formatBytes32String(inputParams));
    }
    else if (paramsType[i] === "uint256") {
      let num = parseInt(document.getElementById(`fct${paramsType[i]}`).value);
      console.log("type : ", typeof(num), "num : ", num);
      params.push(num);
    }
    else if (paramsType[i] === "address")
      params.push(document.getElementById(`fct${paramsType[i]}`).value.toString());
    else if (paramsType[i] === "bool")
      params.push(document.getElementById(`fct${paramsType[i]}`).value.toString());
    else
      params.push(document.getElementById(`fct${paramsType[i]}`).value.toString());
  }
  return params;
}

function displayForm(sc, scAddress, fct, paramsType, fctType) {
  /* input form params */

  let displayForm = document.getElementById(`display-one-fct${fct}`)
  displayForm.innerHTML = `
  <form> `;
  for (let i = 0; i < paramsType.length; i++) {
    displayForm.innerHTML += `
      <input type="text" class="form-control" id="fct${paramsType[i]}" placeholder="${paramsType[i]}">`;
  }
  displayForm.innerHTML += `
    <div class="col-6">  
      <button type="submit" id="btn-form-params${fct}" class="btn btn-primary">Submit</button>
    </div>
  </form> `;

  /* submit form params */
  document.getElementById(`btn-form-params${fct}`).addEventListener("click", async function(e) {
    execFunction(sc, scAddress, fct, paramsType, fctType);
  });
}

async function execFunction(sc, scAddress, fct, paramsType, fctType) {

  let display = document.getElementById(`display-one-fct${fct}`);
  let params = setParamsFct(fct, paramsType);
  let resExec;

  if (fctType == "read")
    resExec = await readSmartContractFunction(sc.network, scAddress, fct, params);
  else if (fctType == "call")
    resExec = await callSmartContractFunction(sc.network, scAddress, fct, params);
  else //event
    resExec = await readSmartContractFunction(sc.network, scAddress, fct, params);

  if (resExec.status == 201) {
    console.log("resExec : ", resExec);
    display.innerHTML = `
    <p class="alert alert-success" role="alert">
      Result : ${resExec.data.response? JSON.stringify(resExec.data.response) : JSON.stringify(resExec.data.logs)}
    </p> `;
  }
  else {
    console.log("error: ", resExec);
    display.innerHTML += `
    <p class="alert alert-danger m-2" role="alert">
      ${resExec.response.data.errorCode} : ${resExec.response.data.message}
    </p> `;
  }
}

async function getAllFunctions(scAddress, sc) {
  const btnScFct = document.getElementById(`btn-sc-fct`);
  btnScFct.addEventListener('click', async () => {
    let ret = await getScFunctions(sc.network, scAddress);
    console.log("ret : ", ret);
    let content = document.getElementById("display-sc-fct");

    Object.keys(ret).forEach(fctType => {
      content.innerHTML += `
      <div id="display${fctType}" class="col-md-6 fct-type"></div>`;

      document.getElementById(`display${fctType}`).innerHTML += `
      <h3 style="text-align:center">${fctType}</h3>`;
      ret[fctType].forEach(fct => {
        document.getElementById(`display${fctType}`).innerHTML += `
        <div class="row">
          <div class="col-10 fct-name">
            <p class="m-0">${fct}</p>
          </div>
          <div class="col-2 m-auto btn-fcts">
            <button type="button" id="btn-fct${fct}" class="btn btn-primary btn-fct"> ${fctType} </button>
            <button type="button" id="btn-hide-fct${fct}" class="btn btn-primary btn-fct" style="display:none"> hide </button>
          </div>
          <div id="display-one-fct${fct}" class="col-12"></div>
        </div>`
      });
    });



    // <div class="col-12">
    // <h5 style="text-align:center">${fctType.toUpperCase()}</h5>
    // <div class="row">`;
    
    // ret[fctType].forEach(fct => {
    //   content.innerHTML += `
    //   <div class="col-6">
    //     <p>${fct}</p>
    //   </div>
    //   <div class="col-4">
    //     <button type="button" id="btn-fct${fct}" class="btn btn-primary btn-fct"> ${fctType} </button>
    //     <button type="button" id="btn-hide-fct${fct}" class="btn btn-primary btn-fct" style="display:none"> Hide ${fctType} </button>
    //   </div>`
    // });
    
    // content.innerHTML += `
    //   </div>
    // </div>









    Object.keys(ret).forEach(fctType => {
      ret[fctType].forEach(fct => {

        /* read function */
        document.getElementById(`btn-fct${fct}`).addEventListener('click', () => {
          /* hide button */
          document.getElementById(`btn-fct${fct}`).style.display = "none";
          document.getElementById(`btn-hide-fct${fct}`).style.display = "block";

          let paramsType = fct.split('(')[1].split(')')[0].split(',');
          if (nbParams(fct) > 0)
            displayForm(sc, scAddress, fct, paramsType, fctType);
          else
            execFunction(sc, scAddress, fct, [], fctType);
        });

        /* show/haide button */
        document.getElementById(`btn-hide-fct${fct}`).addEventListener('click', async () => {
          document.getElementById(`display-one-fct${fct}`).innerHTML = "";
          document.getElementById(`btn-fct${fct}`).style.display = "block";
          document.getElementById(`btn-hide-fct${fct}`).style.display = "none";
        });
      });
    });

    /* modify button Show/hidde btn bottom*/
    btnScFct.hidden = true;
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Hide"));
    btn.setAttribute("class", "btn btn-primary");
    btn.addEventListener('click', () => {
      document.getElementById("display-sc-fct").innerHTML = "";
      btnScFct.hidden = false;
    });
    document.getElementById("display-sc-fct").appendChild(btn);
  });
}

async function displaySc(scAddress) {
  /* display smart contract */
  for (let i = 0; i < networks.length; i++) {
    let sc = await getSc(networks[i], scAddress);
    console.log("res : ", sc);

    if (sc.status == 200) {
      sc = sc.data;
      document.getElementById("display-smart-contract").innerHTML = `
      <div class="col-md-12">
        <div class="card card-list__item">
          <div class="card-body">
            <h5 class="card-title">${sc.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${networks[i]}</h6>
            <p>Address : ${sc.address}</p>
            <p>blockNumber : ${sc.blockNumber}</p>
            <p>createdAt : ${sc.createdAt}</p>
            <p>createdHash : ${sc.createdHash}</p>
            <p>description : ${sc.description}</p>
            <p>id : ${sc.id}</p>
            <p>minedDate : ${sc.minedDate}</p>
            ${sc.params ? `
            <p>params :</p>
            <ul>
              <li>${sc.params[0] ? sc.params[0] : ""}</li>
              <li>${sc.params[1] ? sc.params[1] : ""}</li>
              <li>${sc.params[2] ? sc.params[2] : ""}</li>
              <li>${sc.params[3] ? sc.params[3] : ""}</li>
            </ul>` 
            : ""}
            <div id="display-sc-fct" class="row"></div>
            <button type="button" id="btn-sc-fct" class="btn btn-primary card-list__btn-display_fct"> Functions </button>
          </div>
        </div>
      </div>`;
      getAllFunctions(scAddress, sc);
      break;
    }
  }
}

function inputSearchSmartContract() {
  let scSearch = document.getElementById("button-sc-search");

  scSearch.addEventListener("click", () => {
    let scAddress = document.getElementById("sc-address").value.toString();
    if (scAddress == "") {
      document.getElementById("display-smart-contract").innerHTML = "";
      return;
    }
    else {
      localStorage.setItem('scAddress', scAddress);
    }
    displaySc(scAddress);
  });
}

async function importSc() {
  let importSc = document.getElementById("btn-import-sc");
  importSc.addEventListener("click", async function() {

    let abi = JSON.parse(document.getElementById("sc-abi").value.toString());
    let network = document.getElementById("sc-network").value.toString();
    let name = document.getElementById("sc-name").value.toString();
    let address = document.getElementById("sc-import-address").value.toString();
    // console.log("ABI : " , abi);

    let ret = document.getElementById("display-retour-import-sc");
    let res = await importSmartContract(abi, network, name, address);
    // console.log("res: ", res);
    if (res.status == 201) {
      /* to do : check already exist */
      ret.innerHTML = `
      <div class="alert alert-success" role="alert">
        <p>Smart contract imported</p>
        <p>address: ${res.data.address}</p>
      </div> `;
    }
    else {
      ret.innerHTML = `
      <div class="alert alert-danger m-2" role="alert">
        ${res.response.data.message}
      </div> `;
      console.error(res);
      return;
    }
  });
}

async function displayAllScAddress() {

  /* check all networks*/
  for (let i = 0; i < networks.length; i++) {
    let sc = await getAllSc(networks[i]);
    console.log("res : ", sc);

    if (sc.status == 200 && sc.data.items.length > 0) {
      sc = sc.data.items;
      // console.log(sc);

      /* check all smart contract per network */
      for (let j = 0; j < sc.length; j++) {
        document.getElementById("display-smart-contract-mini").innerHTML += `
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${sc[j].name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${sc[j].network}</h6>
              <a href="#" id="edit-${sc[j].name}" class="card-link">Show</a>
              <a href="#" id="delete-${sc[j].name}" class="card-link">Delete</a>
            </div>
          </div>
        </div>
        `;
      }

      /* show smart contract */
      for (let j = 0; j < sc.length; j++) {
        document.getElementById(`edit-${sc[j].name}`).addEventListener("click", () => {
          displaySc(sc[j].address);
        });
      }

      /* delete smart contract */
      for (let j = 0; j < sc.length; j++) {
        document.getElementById(`delete-${sc[j].name}`).addEventListener("click", async () => {
          let res = await deleteSmartContract(networks[i], sc[j].address);

          if (res.status == 200) {
            document.getElementById("display-smart-contract-mini").innerHTML = "";
            displayAllScAddress();
          }
        });
      }
    }
  }
}




/* ********************************************* */
/*                                               */
/*                 Call function                 */
/*                                               */
/* ********************************************* */

checkConnection();

if (localStorage.getItem('scAddress') != null)
  displaySc(localStorage.getItem('scAddress'));

if (localStorage.getItem('walletAddress') != null)
  displayAllScAddress();

inputSearchSmartContract();
importSc();
