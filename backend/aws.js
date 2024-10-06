import AWS from 'aws-sdk' 
// Import the AWS SDK
import fs from 'fs'
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: 'AKIAQZFG4VI2LC5UAV26',        // Replace with your AWS Access Key
    secretAccessKey: 'VWojSVIcM4JT5UadoRwMpknkgV9vtVJMl1iwNAO1', // Replace with your AWS Secret Key
    region: 'us-east-2'                 // e.g., 'us-west-1', 'us-east-1', etc.
});

// Create an S3 instance
const s3 = new AWS.S3();

export async function uploadFile (fileName, filestr, bucketName) {
    // Read content from the file
    await fromBase64ToFile(fileName, filestr)
    const fileContent = fs.readFileSync(fileName);

    // Set up S3 upload parameters
    const params = {
        Bucket: bucketName, // Bucket name
        Key: fileName,      // File name to be uploaded
        Body: fileContent   // File content
    };

    // Uploading files to the bucket
    s3.upload(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            return data.Location;
        }
    });
};

export async function fromBase64ToFile(fileName, str) {
    try {
        str = str.split(',')[1]
      const data = new Uint8Array(Buffer.from(str, 'base64'));
      const promise = writeFile(fileName, data);

      await promise;
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    } 
}