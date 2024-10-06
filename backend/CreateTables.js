import pool from "./ConnectionUtil.js"

export default async function createAllTables() {
    const p = pool()
    
    await p.query(`DROP SCHEMA if exists data`)
    await p.query(`CREATE SCHEMA if not exists data`)
    await p.query(`USE data`)

    await p.query(`CREATE TABLE User (
        firstName varchar(255),
        lastName varchar(255),
        phoneNumber varchar(20),
        signatureUrl VARCHAR(2083),
        PRIMARY KEY (phoneNumber)
    )`);
    
    await p.query(`CREATE TABLE Document (
        senderNumber varchar(20),
        recieverNumber varchar(20),
        expiryDate date,
        documentUrl VARCHAR(2083),
        signed boolean,
        latitude DECIMAL(9, 7),
        longitude DECIMAL(10, 7),
        PRIMARY KEY (senderNumber, recieverNumber),
        FOREIGN KEY (senderNumber) REFERENCES User (phoneNumber),
        FOREIGN KEY (recieverNumber) REFERENCES User (phoneNumber)
    )`);

}

export async function dropAllTables() {
    const p = pool()
    await p.query(`DROP TABLE if exists User`);
    await p.query(`DROP TABLE if exists Database`);
}