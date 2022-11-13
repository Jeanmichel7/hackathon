import {smartContractTemplate, getEthBalance} from '../../controllers/commun.js';
import {getSc, getAllSc, getScFunctions, importSmartContract, readSmartContractFunction, callSmartContractFunction} from '../../controllers/smartContract.js';

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

function displayForm(fct, paramsType) {
 /* input form params */
 document.getElementById(`display-one-fct${fct}`).innerHTML = `
 <form id="form-fct${fct}"> `;
 for (let i = 0; i < paramsType.length; i++) {
   document.getElementById(`display-one-fct${fct}`).innerHTML += `
     <div class="col-5">
       <input type="text" class="form-control" id="fct${paramsType[i]}" placeholder="${paramsType[i]}">
     </div>`;
 }
 document.getElementById(`display-one-fct${fct}`).innerHTML += `
   <div class="col-2">  
     <button type="submit" id="btn-form-params${fct}" class="btn btn-primary">Submit</button>
   </div>
 </form>`;
}

async function readFunction(sc, scAddress, fct, paramsType) {
  let params = [];

  document.getElementById(`btn-form-params${fct}`).addEventListener('click', async () => {
    /* fill params */
    for (let i = 0; i < paramsType.length; i++) {
      params.push(document.getElementById(`fct${paramsType[i]}`).value);
    }

    /* post and display */
    let display = document.getElementById(`display-one-fct${fct}`);
    let resRead = await readSmartContractFunction(sc.network, scAddress, fct, params);
    if (resRead.status == 201) {
      display.innerHTML = `
      <p class="alert alert-success" role="alert">
        Result : ${JSON.stringify(resRead.data.response)}
      </p>
      `;
    }
    else {
      console.log("error: ", resRead);
      display.innerHTML += `
      <p class="alert alert-danger m-2" role="alert">
        ${resRead.response.data.errorCode} : ${resRead.response.data.message}
      </p>
      `;
      readFunction(sc, scAddress, fct, paramsType);
    }
  });
}

async function getAllFunctions(scAddress, sc) {
  const btnScFct = document.getElementById(`btn-sc-fct`);
  btnScFct.addEventListener('click', async () => {
    let ret = await getScFunctions(sc.network, scAddress);

    // console.log("ret : ", ret);
    Object.keys(ret).forEach(fctType => {
      document.getElementById("display-sc-fct").innerHTML += `
      <div class="col-md-12">
        <h5 style="text-align:center">${fctType.toUpperCase()}</h5>
      </div>
      `;

      ret[fctType].forEach(fct => {
        // console.log("fct : ", fct);
        document.getElementById("display-sc-fct").innerHTML += `
        <div class="row">
          <div class="col-8">
            <p>${fct}</p>
          </div>
          <div class="col-auto">
            <button type="button" id="btn-read-fct${fct}" class="btn btn-primary btn-read-fct"> Read </button>
            <button type="button" id="btn-hide-read-fct${fct}" class="btn btn-primary btn-read-fct" style="display:none"> Hide Read </button>
          </div>
          <div class="col-auto">
            <button type="button" id="btn-call-fct${fct}" class="btn btn-primary btn-call-fct"> Call </button>
            <button type="button" id="btn-hide-call-fct${fct}" class="btn btn-primary btn-call-fct" style="display:none"> Hide Call </button>
          </div>
          <div class="col-12">
            <div id="display-one-fct${fct}" class="row"></div>
          </div>
        </div>
        `;
      });
    });

    Object.keys(ret).forEach(fctType => {
      ret[fctType].forEach(fct => {

        /* read function */
        document.getElementById(`btn-read-fct${fct}`).addEventListener('click', async () => {
          if (nbParams(fct) == 0) {
            let display = document.getElementById(`display-one-fct${fct}`);
            let resRead = await readSmartContractFunction(sc.network, scAddress, fct, []);

            if (resRead.status == 201) {
              console.log(resRead);
              display.innerHTML = `
              <p class="alert alert-success" role="alert">
                Result : ${resRead.data.response}
              </p> `;
            }
            else {
              display.innerHTML = `<p class="alert alert-danger m-2>Error : ${resRead.response.data.message}</p>`;
            }
          }
          else {
            let paramsType = fct.split('(')[1].split(')')[0].split(',');
            displayForm(fct, paramsType);
            readFunction(sc, scAddress, fct, paramsType);
          }

          /* hide and remplace button*/
          document.getElementById(`btn-read-fct${fct}`).style.display = "none";
          document.getElementById(`btn-hide-read-fct${fct}`).style.display = "block";
        });

        document.getElementById(`btn-hide-read-fct${fct}`).addEventListener('click', async () => {
          document.getElementById(`display-one-fct${fct}`).innerHTML = "";
          document.getElementById(`btn-read-fct${fct}`).style.display = "block";
          document.getElementById(`btn-hide-read-fct${fct}`).style.display = "none";
        });



        /* call function */












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
    // console.log("res : ", sc);

    if (sc.status == 200) {
      sc = sc.data;
      document.getElementById("display-smart-contract").innerHTML = `
      <div class="col-md-12">
        <div class="card card-list__item">
          <div class="card-body">
            <p class="form-title"> Your last Search</p>
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
            <div id="display-sc-fct"></div>
            <button type="button" id="btn-sc-fct" class="btn btn-primary card-list__btn-display_fct"> Functions </button>
          </div>
        </div>

      </div>
      `;
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
      </div>
      `;
    }
    else {
      ret.innerHTML = `
      <div class="alert alert-danger m-2" role="alert">
        ${res.response.data.message}
      </div>
      `;
      console.error(res);
      return;
    }
  });
}

async function displayAllScAddress() {

  /* check all networks*/
  for (let i = 0; i < networks.length; i++) {
    let sc = await getAllSc(networks[i]);
    // console.log("res : ", sc);

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
              <a href="#" class="card-link">Edit</a>
              <a href="#" class="card-link">Delete</a>
            </div>
          </div>
        </div>
        `;
      }
    }
  }

  // for(let i = 0; i < networks.length; i++) {
  //   let res = await getAllSc(address);
  //   console.log("res : ", res);
  //   if (res.status == 200) {
  //     res = res.data;
  //     let div = document.createElement("div");
  //     div.setAttribute("class", "col-md-12");
  //     let card = document.createElement("div");
  //     card.setAttribute("class", "card card-list__item");
  //     let cardBody = document.createElement("div");
  //     cardBody.setAttribute("class", "card-body");
  //     let h5 = document.createElement("h5");
  //     h5.setAttribute("class", "card-title");
  //     h5.appendChild(document.createTextNode("Smart contracts"));
  //     cardBody.appendChild(h5);
  //     let ul = document.createElement("ul");
  //     ul.setAttribute("class", "list-group list-group-flush");
  //     res.forEach(elem => {
  //       let li = document.createElement("li");
  //       li.setAttribute("class", "list-group-item");
  //       li.appendChild(document.createTextNode(elem.address));
  //       ul.appendChild(li);
  //     });
  //     cardBody.appendChild(ul);
  //     card.appendChild(cardBody);
  //     div.appendChild(card);
  //     document.getElementById("display-smart-contract").appendChild(div);
  //   }
  // }
}


/* ********************************************* */
/*                                               */
/*                 Call function                 */
/*                                               */
/* ********************************************* */

getEthBalance(localStorage.getItem('ethBalance'));

if (localStorage.getItem('scAddress') != null)
  displaySc(localStorage.getItem('scAddress'));

if (localStorage.getItem('walletAddress') != null)
  displayAllScAddress()

importSc();
inputSearchSmartContract();
