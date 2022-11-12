import {getAllData, getEthBalance} from '../../controllers/commun.js';
import {getSC, getAllSc, getScFunctions} from '../../controllers/smartContract.js';


// let address = "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8";
// let scAddress = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195";
// let network;

/* ********************************************* */
/*                                               */
/*                Define function                */
/*                                               */
/* ********************************************* */

async function display_all_data() {
  let address = localStorage.getItem('ethBalance');
  if (address == null) {
    address = document.getElementById("wallet").value.toString();
    localStorage.setItem('ethBalance', address);
    localStorage.setItem('walletAddress', address);
  }

  let data = await getAllData(address);
  if (data.length != 0) {
    document.getElementById("display").innerHTML = `
    <div>
      <h2>Wallet<h2>
    </div>
    `

    // console.log("req getAllData : ", data);
    Object.keys(data).forEach(key => {
      // console.log(key, data[key]);
      if (data[key].balance.raw != "0") {
        document.getElementById("display").innerHTML += `
        <div>
          <p>${data[key].network} : ${parseFloat(data[key].balance.formatted).toPrecision(2)}
          ${data[key].currencySymbol}
          </p>
        </div>
        `;
      }
    });
    document.getElementById("display-smart-contract").innerHTML = `
    <div>
      <h2>Smart Contract<h2>
    </div>
    `
    for (let i = 0; i < data.length; i++) {
      let sc = await getAllSc(data[i].network);
      console.log("req getAllSc : ", sc);
      if (sc.items.length != 0) {


        for (let j = 0; j < sc.items.length; j++) {
          document.getElementById("display-smart-contract").innerHTML += `
          <div class="col-md-6">
            <div class="card card-list__item">
              <div class="card-body">
                <h5 class="card-title">${sc.items[j].name}</h5>
                <p>Address : ${sc.items[j].address}</p>
                <p>blockNumber : ${sc.items[j].blockNumber}</p>
                <p>createdAt : ${sc.items[j].createdAt}</p>
                <p>createdHash : ${sc.items[j].createdHash}</p>
                <p>description : ${sc.items[j].description}</p>
                <p>id : ${sc.items[j].id}</p>
                <p>minedDate : ${sc.items[j].minedDate}</p>
                <p>params :</p>
                <ul>
                  <li>${sc.items[j].params[0]}</li>
                  <li>${sc.items[j].params[1]}</li>
                  <li>${sc.items[j].params[2]}</li>
                  <li>${sc.items[j].params[3]}</li>
                </ul>
                <div id="display-sc-fct${j}"></div>
                <button type="button" id="btn-sc-fct${j}" class="btn btn-primary"> Functions </button>
              </div>
            </div>
          </div>
          `;
          // getScFunctions(sc.items[j].network, sc.items[j].address)
        }

        for (let j = 0; j < sc.items.length; j++) {
          const btnScFct = document.getElementById(`btn-sc-fct${j}`);
          btnScFct.addEventListener('click', async () => {
            let ret = await getScFunctions(sc.items[j].network, sc.items[j].address);
            let div = document.createElement("div");
            div.appendChild(document.createElement("br"));

            Object.keys(ret).forEach(key => {
              let h3 = document.createElement("h3");
              h3.appendChild(document.createTextNode(key));
              div.appendChild(h3);

              Object.keys(ret[key]).forEach(elem => {
                div.appendChild(document.createTextNode(ret[key][elem]));
                div.appendChild(document.createElement("br"));
              });

              div.appendChild(document.createElement("br"));
            });
            document.getElementById("display-sc-fct" + j).appendChild(div);
          });
        }
      }
    }
    getEthBalance(localStorage.getItem('ethBalance'));
  }
}



/* ********************************************* */
/*                                               */
/*                 Call function                 */
/*                                               */
/* ********************************************* */

const btnWallet = document.getElementById("button-wallet");
btnWallet.addEventListener("click", display_all_data);
if (localStorage.getItem('ethBalance') != undefined) {
  getEthBalance(localStorage.getItem('ethBalance'));
  display_all_data();
}
