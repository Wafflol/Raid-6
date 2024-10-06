import mysql from "mysql2"

const mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "userroot",
    database: "data"
}

export default function pool() {
    const pool = mysql.createPool(mysqlConfig).promise();
    return pool;
}