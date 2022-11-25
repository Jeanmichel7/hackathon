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
    </form> `;

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

function displayComment(data) {
  if (data != undefined) {
    let div = document.getElementById("all-com");
    div.innerHTML = `
    <h3>Users reviews</h3>
    <div class="comment-wrapper" id="comment-id"></div>`;

    let display = document.getElementById("comment-id");
    Object.keys(data).forEach(item => {
      display.innerHTML += `
      <div class="row item">
        <p>${data[item]}</p>
      </div> `;
    });

    // div.innerHTML += `
    //   </div>
    // `;
  }
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
    </div> `;
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
      //dispalay commment
      let res4 = await readSmartContractFunction("binance-testnet", addressOfSmartContract, "products", [i]);
      let product4 = res4.data.response;

      if (product4[3] != "") {
        let Data = await getIpfsData(product4[3]);
        displayComment(Data.data);
      }

      document.getElementById("all-reviews").innerHTML = `
      <div class="container form-review">
      <h3>Add your reviews</h3>
        <form>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="pwd-review" placeholder="Enter password">
            <small class="form-text text-muted">It has been sent to you by mail.</small>
          </div>
          <div class="form-group">
            <label for="review">Enter your review</label>
            <textarea class="form-control" id="review" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="wallet-id">Wallet</label>
            <input class="form-control" id="wallet-id" placeholder="Enter Wallet">
          </div>
          <button id="btn-submit-review" class="btn btn-primary mb-2">Submit</button>
          <button id="btn-get-hash" class="btn btn-primary mb-2">Get hash</button>
          <span id="hash"></span>
        </form> 
      </div>`;

      document.getElementById("btn-get-hash").addEventListener("click", async function (e) {
        e.preventDefault();
        await displayHash(i);
      });

      document.getElementById("btn-submit-review").addEventListener("click", async function(e) {
        e.preventDefault();
        let pwd = document.getElementById("pwd-review").value.toString();
        let message = document.getElementById("review").value.toString();
        let wallet = document.getElementById("wallet-id").value.toString();

        let res3 = await readSmartContractFunction("binance-testnet", addressOfSmartContract, "products", [i]);
        let product2 = res3.data.response;

        if (pwd == "" || message == "" || wallet == "") {
          alert("Please fill all the fields");
        }
        else {
          await uploadReview(pwd, message, product2[3], parseInt(product2[0], 10), product2[2], wallet);
          window.location.reload();
        }
      });
    });
  }
}

async function displayHash(index) {
  let addressOfSmartContract = JSON.parse(localStorage.getItem('smartContract')).smartContract.address;
  let res3 = await readSmartContractFunction("binance-testnet", addressOfSmartContract, "products", [index]);
  let product2 = res3.data.response;
  let hash = await addHash(product2[0], product2[2])
  let spanHash = document.getElementById("hash");
  spanHash.innerHTML = hash ;
  return hash;
}

function addReview(obj, review) {
  obj[Object.keys(obj).length] = review
}

async function genPassAndHash() {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charLength = chars.length;
  var passwd = "";
  let res = [];
  for ( var i = 0; i < 24; i++ )
    passwd += chars.charAt(Math.floor(Math.random() * charLength));
  res.push(passwd);
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(passwd));
  let hash = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  res.push(hash);
  return res;
}

async function addHash(id, cid) {
  let pwd = await genPassAndHash();

  let addressObj = localStorage.getItem('smartContract');
  let address = JSON.parse(addressObj).smartContract.address;

  listpwd.push(pwd[0])
  let hashobj
  if (cid == "") {
    hashobj = {}
  }
  else {
    let Data = await getIpfsData(cid);
    console.log("res : ", Data);
    hashobj = Data.data;
  }
  addReview(hashobj, pwd[1]);
  let upload = await uploadToIpfs('hash.json', hashobj);
  let data = [];
  data.push(parseInt(id, 10));
  data.push(upload.data.cid);
  await callSmartContractFunction('binance-testnet', address, "setHashCID", data);
  return pwd[0];
}

async function removeHash(pwd, cid)
{
  let Data = await getIpfsData(cid)
  let hashobj = Data.data
  let valid = await validHash(hashobj, pwd)
  if ( valid == true)
  {
    console.log("Hash CID uploaded")
    let upload = await uploadToIpfs('hash.json', hashobj)
    return upload.data.cid
  }
  return 0;
}

async function uploadReview(pwd, newReview, cid, id, oldCid, wallet)
{
  let hashcid = await removeHash(pwd, oldCid);
  let addressObj = localStorage.getItem('smartContract');
  let address = JSON.parse(addressObj).smartContract.address;
  if (hashcid == 0)
    return
  let reviews;
  //function call to get ProductCID
  if(cid == "") {
    console.log("vide")
    reviews = {}
  } 
  else {
    let Data = await getIpfsData(cid)
    reviews = Data.data
  }
  addReview(reviews, newReview)
  let upload = await uploadToIpfs('cid.json', reviews)
  let param = [id, upload.data.cid, hashcid]
  await callSmartContractFunction('binance-testnet', address, "setAllCID", param);
  await callSmartContractFunction('binance-testnet', address, "sendRewardFromPool", [wallet, id]);
}

async function validHash(hashobject, passwd) {
  let rvalue = false;

  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(passwd));
  let testhash = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');

  Object.keys(hashobject).forEach(key => {
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

connectWallet("Wallet Address");
if (localStorage.getItem('smartContract') == undefined) {
  await importSc();
}

display_all_products();