
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/db8eb3730f";

const options = {
  method: "POST",
  //for authentication
  auth: "nalin1:f13375128bcd74e580201d6272dfaacf-us21"
}

const request = https.request(url, options, function(response) {

if(response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);//pass data to mailchimp server
request.end();

});


//redirects the user to home route i.e. signup page
app.post("/failure",function(req,res){
  res.redirect("/")
})


app.listen(3000,function() {
  console.log("Server is running on port 3000");
})

//api key
//f13375128bcd74e580201d6272dfaacf-us21

//list id
//db8eb3730f
