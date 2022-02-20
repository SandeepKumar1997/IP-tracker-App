const express = require("express");
const http = require("https");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let ipDetails;
let Address,locate,zone,isp;

app.get("/", (req, res) => {
  res.render("map");
});

app.post("/", (req, res) => {
  const apiKey = "at_tYEdbDb3AQLXfkaFb3QekqClJSL84";
  const ipAddress = req.body.ipaddress;
 const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;
//   let Address = "";
//   let locate = "";
//   let zone = "";
//   let isp = "";

 http.get(url,(result)=>{
    result.on('data',(data)=>{
        ipDetails = JSON.parse(data);
        Address = ipDetails.ip;
        locate = ipDetails.location.city;
        zone = ipDetails.location.timezone;
        isp = ipDetails.isp;
    })
 }).on('error',(e)=>{
     console.log(e);
 })

  res.render("mapResult", {
    Address: Address,
    locate: locate,
    zone: zone,
    isp: isp,
  });
});

app.listen(3000, console.log("Server listening"));
