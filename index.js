const http = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
      "x-api-key": 'a9Wp0e1aqMX8pmxvrNFImYwh1Pe3xU7u', //API KEY COPIED FROM STARTON
  },
})


let address = "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8"
let network = "polygon-mumbai";

// http.get('/wallet/' + address)
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// })
// .then(function () {
//   // dans tous les cas
// });  



async function getWalletId() {
  try {
    const response = await http.get('/wallet/' + address);
    console.log("res getWalletId : ", response.data);
  } catch (error) {
    console.error(error);
  }
}
getWalletId();


async function getWallet() {
  try {
    const response = await http.get('/wallet/');
    console.log("res getWallet : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}
getWallet();

async function getWalletBalance() {
  try {
    const response = await http.get('/wallet/' + address + '/balance');
    console.log("res getWalletBalance : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}
getWalletBalance();


async function getWalletNetworkBalance() {
  try {
    const response = await http.get('/wallet/' + address + '/' + network + '/balance');
    console.log("res getWalletNetworkBalance : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}
getWalletNetworkBalance();