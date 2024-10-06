import createAllTables from './CreateTables.js'
import pool from './ConnectionUtil.js'
import cors from "cors"
import express from 'express'
import axios from 'axios'
import {uploadFile, fromBase64ToFile} from './aws.js'

const app = express()
const port = 4000

//createAllTables();

app.use(express.json())
app.use(cors())

app.post('/upload', async (req, res) => {
    try {
        console.log(req.body)
        uploadFile(req.body.fileName, req.body.encodedFile, 'rogershack24');
        // await p.query(`INSERT INTO Document(senderNumber, receiverNumber, expiryDate, documentUrl, signed, latitude, longitude) VALUES ("1234567890", "${req.body.phoneNumber}", "2024-10-16", "", 49.261407206266355, -123.24892057404195)`);
        
        // 49.261407206266355, -123.24892057404195
        res.status(200).send("File uploaded")
    }
    catch (err) {
        res.status(400).send("Could not upload file: " + err)
    }
    //generate a file in s3 and await response
    //upload link + details to db
    //notify the user about the document
})

app.post('/register', async (req, res) => {
    const p = pool();
    await p.query(`INSERT INTO User(firstName, lastName, phoneNumber, signatureUrl) VALUES ("${req.body.firstName}", "${req.body.lastName}", "${req.body.phoneNumber}", "${req.body.signatureUrl}")`);
    res.status(201).send("User creation successful")
})

app.post("/login", (req, res) => {
    const data = {
        phoneNumber: req.body.phoneNumber
    };
    axios.post('https://pplx.azurewebsites.net/api/rapid/v0/numberVerification/verify', data, {
        headers: {
            'Authorization': 'Bearer ed6318',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((result) => {
        if (result.data.devicePhoneNumberVerified) {
            res.status(200).send({"login":true})
        } else { 
            res.status(401).send({"login":false})
        }
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})

app.get('all-documents/', (req, res) => {
    //get all the documents for the current user
})

app.get("document/", (req, res) => {
    //get specific document for the user by
})

app.post('decision/', (req, res) => {
    //depending on the users decision update the db
    //if user accepts notify the sender and replace old doc with new
    //if user declines, purge the document from S3 
})

app.post('/location', (req, res) => {
    const data = {
        phoneNumber: req.body.phoneNumber,
        area: {
            "areaType": "CIRCLE",
            "center": {
                "latitude": 49.261407206266355,
                "longitude": -123.24892057404195,
            },
            "radius": 50000
        }
    };
    axios.post('https://pplx.azurewebsites.net/api/rapid/v0/location-verification/verify', data, {
        headers: {
            'Authorization': 'Bearer ed6318',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((result) => {
        if (result.data.verificationResult) {
            res.status(200).send({"verified":true})
        } else { 
            res.status(200).send({"verified":true})
        }
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})