const mysql = require('mysql');

class Database {

    constructor() {
        this.host = '127.0.0.1';
        this.username = 'root';
        this.password = '123456@Abc';
        this.database = 'app-food';
        this.charset = 'utf8_general_ci';
    }

    connection() {
        return mysql.createConnection({
            'host': this.host,
            'user': this.username,
            'password': this.password,
            'database': this.database,
            'charset': this.charset
        });
    }
}

module.exports = Database
