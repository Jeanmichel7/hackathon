import {getEthBalance} from '../../controllers/commun.js';
import {smartContractTemplate} from '../../controllers/token.js';

async function displayTemplate() {
  let allTemplate = await smartContractTemplate();
  allTemplate = allTemplate.items;
  for (const elem in allTemplate) {
    // console.log("elem : ", elem);
    document.getElementById("display-all-template").innerHTML += 
    `
    <div class="col-auto">
      <div class="card template-list__item">
        <div class="card-body">
          <h5 class="card-title">${allTemplate[elem].name}</h5>
          <p class="card-text">${allTemplate[elem].shortDescription}</p>
          <a href="#" class="btn btn-primary" id="create-token">Create token</a>
        </div>
      </div>
    </div>
    `
  }
}


getEthBalance(localStorage.getItem('ethBalance'));
displayTemplate();