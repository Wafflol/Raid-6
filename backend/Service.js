import createAllTables from './CreateTables.js'
import pool from './ConnectionUtil.js'
import cors from "cors"
import express from 'express'
import axios from 'axios'
import {uploadFile, fromBase64ToFile} from './aws.js'

const app = express()
const port = 3000

async function sendPhoneNumberRequest(phoneNum) {
    const data = {
        phoneNumber: phoneNum
    };
    await axios.post('https://pplx.azurewebsites.net/api/rapid/v0/numberVerification/verify', data, {
        headers: {
            'Authorization': 'Bearer ed6318',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((result) => {
        return result.data.devicePhoneNumberVerified;
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}

//createAllTables();

app.use(express.json())
app.use(cors())

app.post('/upload', async (req, res) => {
    try {
        console.log(req.body)
        uploadFile(req.body.fileName, req.body.encodedFile, 'rogershack24')
        
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

app.post("/login", async (req, res) => {
    if (sendPhoneNumberRequest(req.body.phoneNumber)) {
        res.status(200).send("Login Successful")
    } else {
        res.status(401).send("Login Unsuccessful")
    }
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})