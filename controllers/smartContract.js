import {http} from './commun.js';

/* Smart Contract */
export async function getAllSc(network) {
  try {
    const response = await http.get('/smart-contract/' + network);
    // console.log("res getAllSc : ", response.data);

    Object.keys(response.data.items).forEach(key => {
      // console.log(key, response.data.items[key]);
      document.getElementById("display-smart-contract").innerHTML += `
      <div>
        <p> name        : ${response.data.items[key].name} </p>
        <p> description : ${response.data.items[key].description} </p>
        <p> address     : ${response.data.items[key].address} </p>
        <p> network     : ${response.data.items[key].network} </p>
      </div>
      `;
      getScFunctions(response.data.items[key].network, response.data.items[key].address);
    });
  }
  catch (error) {
    console.error(error);
  }
}

export async function getScFunctions(network, scAddress) {
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
        div.appendChild(document.createTextNode(response.data[key][elem]));
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

export async function getSC() {
  try {
    const response = await http.get('/smart-contract/' + network + '/' + scAddress);
    console.log("res getSC : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}

// export async function deploySmartContractFromTemplate() {
//   try {
//     const response = await http.post('/smart-contract/from-template', {
//       "params": {
//         "param1": "value1",
//         "param2": "value2"
//       }
//     });
//     console.log("res postSc : ", response.data);
//   }
//   catch (error) {
//     console.error(error);
//   }
// }
