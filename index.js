import {getAllData, getEthBalance} from './controllers/commun.js';
import {getSC, getAllSc, getScFunctions} from './controllers/smartContract.js';


// let address = "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8";
// let scAddress = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195";
// let network;


async function display_all_data() {
  let address = document.getElementById("wallet").value.toString();
  localStorage.setItem('ethBalance', address);

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
    document.getElementById("display-smart-contract").innerHTML += `
    <div>
      <h2>Smart Contract<h2>
    </div>
    `

    Object.keys(data).forEach(key => {
     getAllSc(data[key].network);
    });
  }
}




const btnWallet = document.getElementById("button-wallet");
btnWallet.addEventListener("click", display_all_data);

getEthBalance(localStorage.getItem('ethBalance'));
