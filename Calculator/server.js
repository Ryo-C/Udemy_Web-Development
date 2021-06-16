const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function (req, res) {

    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = weight / (height * height);

    res.send("Your BMI is " + bmi);
})

app.listen(3000, function () {
    console.log("Server started in port 3000");
});