import {checkConnection, getBnbBalance, listpwd, ipfs} from './controllers/commun.js';
import {getSc, deploySmartContract, readSmartContractFunction, callSmartContractFunction, uploadToIpfs, pinIpfs, deletePinIpfs, getIpfs, getIpfsData} from './controllers/smartContract.js';
import { bytesCode, ABI } from './controllers/importSmartContract.js';



/* ********************************************* */
/*                                               */
/*                Define function                */
/*                                               */
/* ********************************************* */

async function importSc() {
  let params = [];
  let network = "binance-testnet";
  let name = "scname";
  let address = "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8"; // a modifier


  let allMySc = await getSc(network, name);

  for(let i = 0; i < allMySc.length; i++) {
    if(allMySc[i].name == name) {
      console.log("already deployed");
      return;
    }
  }

  let res = await deploySmartContract(ABI, params, network, bytesCode.toString(), name, address);
  if (res.status == 201) {
    console.log("Smart contract imported : ", res.data);
    localStorage.setItem('smartContract', JSON.stringify(res.data));
    return res.data;
  }
  else {
    alert("Error : ", res.data);
    console.error(res);
    return null;
  }
}

function connectWallet(str) {
    let btn = document.getElementById("connectButton");
    btn.addEventListener("click", async function() {

    btn.style.display = "none";
    let display = document.getElementById("header-bnb-balance");
    display.innerHTML = `
    <form class="form-inline">
      <div class="form-group">
        <input class="form-control mr-sm-2 input-wallet-address" placeholder="${str}" id="wallet-address">
        <button id="btn-submit-wallet" class="btn btn-primary mb-2">Connect</button>
      </div>
    </form>
    `;

    document.getElementById("btn-submit-wallet").addEventListener("click", async function(e) {
      e.preventDefault();
      let address = document.getElementById("wallet-address").value.toString();
      if (address != null) {
        let res = await getBnbBalance(address);
        localStorage.setItem('bnbBalance', address);
        document.getElementById("connectButton").style.display = "none";
      }
      else {
        connectWallet("invalid wallet address");
      }
    });
  });
}

async function display_all_products() {
  let addressOfSmartContract = JSON.parse(localStorage.getItem('smartContract')).smartContract.address;
  let res = await readSmartContractFunction("binance-testnet", addressOfSmartContract, "total_products", []);
  let nbProducts = res.data.response;

  for (let i = 0; i < nbProducts; i++) {
    let res2 = await readSmartContractFunction("binance-testnet", addressOfSmartContract, "products", [i]);
    let product = res2.data.response;

    document.getElementById("all-products").innerHTML += `
    <div id="item-id-${product[0]}" class="col-auto">
      <div class="card">
      <img class="card-img-top card-img" src="assets/img-${i}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">sub title</h6>
          <p class="card-text">${product[1]}</p>
          <p class="card-text">50$</small></p>
          <a href="#all-reviews" id="item-${product[0]}" class="btn btn-primary">Reviews</a>
        </div>
      </div>
    </div>
    `;
  }

  for (let i = 0; i < nbProducts; i++) {
    let res2 = await readSmartContractFunction("binance-testnet", addressOfSmartContract, "products", [i]);
    let product = res2.data.response;

    document.getElementById(`item-${product[0]}`).addEventListener("click", async function(e) {
      e.preventDefault();
      for(let j = 0; j < nbProducts; j++) {
        if (j != i) {
          document.getElementById(`item-id-${j}`).style.display = "none";
        }
      }

      document.getElementById("all-reviews").innerHTML = `
      <form>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="pwd-review" placeholder="Enter password">
          <small class="form-text text-muted">it has been sent to you by mail.</small>
        </div>
        <div class="form-group">
          <label for="review">Enter your review</label>
          <textarea class="form-control" id="review" rows="3"></textarea>
        </div>
        <button id="btn-submit-review" class="btn btn-primary mb-2">Submit</button>
      </form> `;

      document.getElementById("btn-submit-review").addEventListener("click", async function(e) {
        e.preventDefault();
        let pwd = document.getElementById("pwd-review").value.toString();
        let message = document.getElementById("review").value.toString();
        
        console.log("passWord ", pwd);
        console.log("message ", message);

        console.log(product);


        // logic de hash password et compare et le reste
      });
    });
  }
}



// let retourup=await uploadToIpfs('cidnew.json', obj)
// console.log(retourup)
function addReview(obj, review)
{
  obj[Object.keys(obj).length] = review
}


async function genPassAndHash() {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charLength = chars.length;
  var passwd = '';
  for ( var i = 0; i < 24; i++ ) {
      passwd += chars.charAt(Math.floor(Math.random() * charLength));
  }
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(passwd));
  let hash = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  return [passwd, hash];
}

async function addHash(cid) {
  let pwd = genPassAndHash();
  let address = "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8";
  listpwd.push(pwd[0])
  let hashobj
  if (cid === 0) {
    hashobj = {}
  }
  else {
    let Data = await getIpfsData(cid)
    hashobj = Data.data.Object
  }
  addReview(hashobj, pwd[1])
  let upload = await uploadToIpfs('hash.json', hashobj)
  // callSmartContractFunction('binance-testnet', address, 'setHashCID', upload.data.cid)
}

function deleteHash(obj)
{
  let keys = Object.keys(obj)
  delete obj[keys[keys.length-1]]
}

async function removeHash(pwd, cid)
{
  let Data = await getIpfsData(cid)
  let hashobj = Data.data.Object
  if ( validHash(pwd, hashobj))
  {
    let upload = await uploadToIpfs('hash.json', hashobj)
    return upload.data.cid
  }
}

async function uploadReview(newReview, cid)
{
  let reviews;
  //function call to get ProductCID
  if(cid === 0)
    reviews = {}
  else
  {
  let Data = await getIpfsData(cid)
  reviews = Data.data.Object
  }
  addReview(reviews, newReview)
  let upload = await uploadToIpfs('cid.json', reviews)
  if (upload.data.cid)
  {
    let param = [id, hashcid, upload.data.cid]
    callSmartContractFunction('binance-testnet', address, "setAllCID", param)
  }
}

function validHash(hashobject, testhash) {
  let rvalue = false;
  Object.keys(hashobject).forEach(key => {
      console.log("c'est pas lui : ", hashobject[key]);
      if (testhash == hashobject[key]) {
          rvalue = true;
          delete hashobject[key];
          return ; 
      }
  })
  return (rvalue);
}

/* ********************************************* */
/*                                               */
/*                 Call function                 */
/*                                               */
/* ********************************************* */

checkConnection();
// checkSmartContractIsImported();

connectWallet("Wallet Address");
if (localStorage.getItem('smartContract') == undefined) {
  await importSc();
  // await addProduct();
}
console.log("smart contract : ", JSON.parse(localStorage.getItem('smartContract')));


display_all_products();

const obj = {0:"Super Produit"};
addReview(obj, "Super");
addHash(0);
