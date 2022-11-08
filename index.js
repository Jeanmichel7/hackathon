const http = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
      "x-api-key": 'a9Wp0e1aqMX8pmxvrNFImYwh1Pe3xU7u', //API KEY COPIED FROM STARTON
  },
})

let address = "";
// let address = "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8";
let scAddress = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195";
// let address = "0xa22d224bFCBBB2aD6714C2b5feBbfe638fBC9627"
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
    let thomas = document.getElementById("wallet").value;
    address = thomas;
    const response = await http.get('/wallet/' + address + '/balance');
    console.log("res getWalletBalance : ", response.data.balance.formatted);
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
    console.log("res getAllSc : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}

async function getScFunction() {
  try {
    const response = await http.get('/smart-contract/' + network + '/' + scAddress + '/available-functions');
    console.log("res getScFunction : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}


// document
//   .getElementById("wallet")
//   .addEventListener("input", function(e) {
//     document .getElementById("display-address").innerText = e.target.value;
//     address = e.target.value;
// });



// getWalletNetworkBalance();

// getWalletBalance();
// getWallet();
// getAllSc();
// getSC();
// getScFunction();


// getWalletNetworkBalance();

