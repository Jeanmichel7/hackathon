const http = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
      "x-api-key": 'a9Wp0e1aqMX8pmxvrNFImYwh1Pe3xU7u', //API KEY COPIED FROM STARTON
  },
})

let data = {};
let scAddress = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195";
let network = "ethereum-goerli";

async function getWalletId() {
  try {
    const response = await http.get('/wallet/' + address);
    console.log("res getWalletId : ", response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getWallet() {
  try {
    const response = await http.get('/wallet/');
    console.log("res getWallet : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}

async function getWalletBalance() {
  try {
    let address = document.getElementById("wallet").value.toString();
    const response = await http.get('/wallet/' + address + '/balance');

    Object.keys(response.data).forEach(key => {
      // console.log(key, response.data[key]);
      document.getElementById("display").innerHTML += `
      <div>
        <p>${response.data[key].network} : ${parseFloat(response.data[key].balance.formatted).toPrecision(2)}
        ${response.data[key].currencySymbol}
        </p>
      </div>
      `;
    });
  }
  catch (error) {
    console.error(error);
  }
}

async function getWalletNetworkBalance() {
  try {
    const response = await http.get('/wallet/' + address + '/' + network + '/balance');
    console.log("res getWalletNetworkBalance : ", response.data.balance.formatted);
  }
  catch (error) {
    console.error(error);
  }
}

async function gasOnMatic() {
  try {
    const response = await http.get('/gas-price/' + network);
    console.log("res gasOnMatic : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}


async function getSC() {
  try {
    const response = await http.get('/smart-contract/' + network + '/' + scAddress);
    console.log("res getSC : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}

async function getAllSc() {
  try {
    const response = await http.get('/smart-contract/' + network);
    // console.log("res getAllSc : ", response);

    Object.keys(response.data.items).forEach(key => {
      // console.log(key, response.data.items[key]);
      document.getElementById("display-smart-contract").innerHTML += `
      <div>
        <p> name        : ${response.data.items[key].name} </p>
        <p> description : ${response.data.items[key].address} </p>
        <p> network     : ${response.data.items[key].network} </p>
      </div>
      `;
      getScFunction(response.data.items[key].network, response.data.items[key].address);
    });


  }
  catch (error) {
    console.error(error);
  }
}

async function getScFunction(network, scAddress) {
  try {
    const response = await http.get('/smart-contract/' + network + '/' + scAddress + '/available-functions');
 
    let div = document.createElement("div");
    div.appendChild(document.createTextNode("Functions : "));
    div.appendChild(document.createElement("br"));

    Object.keys(response.data).forEach(key => {

      let h3 = document.createElement("h3");
      h3.appendChild(document.createTextNode(key));
      div.appendChild(h3);

      Object.keys(response.data[key]).forEach(elem => {
        div.appendChild(document.createTextNode(elem + " : " + response.data[key][elem]));
        div.appendChild(document.createElement("br"));
      });
      div.appendChild(document.createElement("br"));
    });
    document.getElementById("display-smart-contract").appendChild(div);
  }
  catch (error) {
    console.error(error);
  }
}

function display_all_data() {
  getWalletBalance();
  getAllSc();
}