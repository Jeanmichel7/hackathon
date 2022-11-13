import {smartContractTemplate, getEthBalance} from '../../controllers/commun.js';
import {getSc, getAllSc, getScFunctions, importSmartContract, readSmartContractFunction, callSmartContractFunction} from '../../controllers/smartContract.js';

import {networks} from '../../controllers/commun.js';

/* ********************************************* */
/*                                               */
/*                Define function                */
/*                                               */
/* ********************************************* */

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
          </div>
          <div class="col-auto">
            <button type="button" id="btn-call-fct${fct}" class="btn btn-primary btn-call-fct"> Call </button>
          </div>
          <div class="col-auto ">
            <span id="display-one-fct${fct}"></span>
          </div>
        </div>
        `;
      });
    });


    Object.keys(ret).forEach(fctType => {
      ret[fctType].forEach(fct => {

        document.getElementById(`btn-read-fct${fct}`).addEventListener('click', async () => {
          let resRead = await readSmartContractFunction(sc.network, scAddress, fct, []);

          if (resRead.status == 201) {
            console.log(resRead);
            document.getElementById(`display-one-fct${fct}`).innerHTML = `
            <p>Result : ${resRead.data.response}</p>
            `;
          }
          else {
            document.getElementById(`display-one-fct${fct}`).innerHTML = `
            <p>Error : ${resRead.response.data.message}</p>
            `;
          }

          document.getElementById(`display-one-fct${fct}`).innerHTML += `
          <div class="row">
            <div class="col-8">
              <p>Return value: ${resRead}</p>
            </div>
          </div>
          `;
        });
      }
      );
    });





    /* test  */
    // let div = document.createElement("div");
    // div.appendChild(document.createElement("br"));
    // /* functions types */
    // Object.keys(scFunctions).forEach(key => {
    //   let h3 = document.createElement("h3");
    //   h3.appendChild(document.createTextNode(key));
    //   div.appendChild(h3);

    //   /* functions names */
    //   Object.keys(scFunctions[key]).forEach(elem => {
    //     div.appendChild(document.createTextNode(scFunctions[key][elem]));
    //     div.appendChild(document.createElement("br"));
    //   });
    //   div.appendChild(document.createElement("br"));
    // });
    // document.getElementById("display-sc-fct").appendChild(div);

    /* modify button Show to hide */
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

if (localStorage.getItem('scAddress') != null) {
  // console.log("scAddress : ", localStorage.getItem('scAddress'));
  displaySc(localStorage.getItem('scAddress'));
}

if (localStorage.getItem('walletAddress') != null)
  displayAllScAddress()

inputSearchSmartContract();
importSc();
