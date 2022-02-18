const express=require('express');
const http = require('https');
const app=express();
const bodyParser=require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
res.render('map')
})


app.post("/",(req,res)=>{
    console.log(req.body);
    

var ip = req.body.ipaddress;
var api_key = 'at_tYEdbDb3AQLXfkaFb3QekqClJSL84';
var api_url = 'https://geo.ipify.org/api/v1?';

var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

http.get(url, function(response) {
    var str = '';
    response.on('data', function(chunk) { str += chunk; });
    response.on('end', function() { console.log(str); });
}).end();
})

app.listen(3000,console.log("Server listening"))
