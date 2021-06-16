const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req ,res){   
console.log(req.body.cityname);

const query =req.body.cityname;
const apikey ="6aa7499bfad59172fded83a1dee969e9"
const unit = "metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apikey+"&unit=mertric"

https.get(url, function(response){
console.log(response.statusCode);
response.on("data", function(data){

const weatherData= JSON.parse(data);

console.log(weatherData);
const temp = weatherData.main.temp;
const weatherDiscription=weatherData.weather[0].description
const feelsLiike = weatherData.main.feels_like
const icon = weatherData.weather[0].icon

const temp2= Number(temp-273);
const newTemp =temp2.toFixed(2);

const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
console.log(weatherDiscription);

res.write("<h1>The condition in "+ query+ " will be "+weatherDiscription +".</h1>");
res.write("<img src = " + imageURL+">");
res.write(" <h1>Weather in Kelvin=" + temp+ "K" );
res.write("<h1>Weather in dgree celsius is = " + newTemp +"  C'");
res.send();

});
});
});
app.listen(3000, function(){
console.log("the server is running on the port 3000");
})