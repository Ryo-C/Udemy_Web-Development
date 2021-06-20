const express = require("express");
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // const data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: "subcribed",
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName
    //             }
    //         }
    //     ]
    // }

    // const jsonData = JSON.stringify(data);

    mailchimp.setConfig({
        apiKey: "bb339a43869942e8225209b335112827-us6",
        server: "us6",
    });

    const listId = "fcf3ecc8f2";

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        });

        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id
            }.`
        );

        res.sendFile(__dirname + "/success.html");
    }

    run();


    // const url = "https://us6.api.mailchimp.com/3.0/lists/fcf3ecc8f2"

    // const options = {
    //     method: "POST",
    //     auth: "key:bb339a43869942e8225209b335112827-us6"
    // }

    // const request = https.request(url, options, function (response) {
    //     console.log('statusCode:', response.statusCode);
    //     console.log('headers:', response.headers);

    //     response.on("data", function (data) {
    //         console.log(JSON.parse(data));
    //     });
    // });

    // request.on('error', (e) => {
    //     console.error(e);
    // });

    // request.write(jsonData);
    // request.end;

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})

// MailChimp API Key:
// bb339a43869942e8225209b335112827-us6

// List ID
// fcf3ecc8f2