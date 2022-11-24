const express = require('express')
const app = express()



app.get('/test', async (req,res) => {
  // console.log("req : ", req);
  res.send("Liste des parkings")
})





app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})
