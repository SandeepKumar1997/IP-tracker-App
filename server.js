const express = require("express");
const http = require("https");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let ipDetails;


app.get("/", (req, res) => {
  res.render("map");
});

app.post("/", (req, res) => {
  const apiKey = "at_tYEdbDb3AQLXfkaFb3QekqClJSL84";
  const ipAddress = req.body.ipaddress;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    let Address = "";
    let locate = "";
    let zone = "";
    let isp = "";
    let lat="";
    let lon=""

  http.get(url, (result) => {
    result.on('data', (data) => {
     
      ipDetails = JSON.parse(data);
      Address = ipDetails.ip;
      locate = `${ipDetails.location.city}, ${ipDetails.location.country} ${ipDetails.location.postalCode}`;
      zone = `UTC ${ipDetails.location.timezone}`;
      isp = ipDetails.isp;
      lat=ipDetails.location.lat;
      lon=ipDetails.location.lng;
     
      
      
      res.render("mapResult", { Address1: Address, locate: locate, zone: zone, isp: isp,lat:lat,lng:lon});
    })
  }).on('error', (e) => {
    console.log(e);
  })
  
  
});
// console.log(ipStack);
// app.get('/map', (req, res) => {
//   res.render('mapResult', { Address1: ipStack[0], locate: ipStack[1], zone: ipStack[2], isp: ipStack[3] });
//   console.log(ipStack[0]);
// })

app.listen(3000, console.log("Server listening"));
