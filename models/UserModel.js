let Database = require("./Database.js");

class UserModel {

    constructor() {
        let db = new Database()
        this.conn = db.connection();
    }

    getUsers() {
        return new Promise(((resolve, reject) => {
            let sql = "SELECT * FROM users";
            this.conn.query(sql, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        }))

    }

    getRoleUser() {
        return new Promise(((resolve, reject) => {
            let sql = "SELECT * FROM roles";
            this.conn.query(sql, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        }))
    }

    storeUser(name, email, password, roleId) {
        //thuc hien them moi bang user
        this.insertUser(name, email, password).then(result => {
            // lấy id lớn nhất bảng user chính là id của người dùng mới tạo
            this.getIDMaxUser().then(res => {
                let userIDMaxCurrent = res[0].userID;
                this.insertRoleUser(userIDMaxCurrent, roleId)
            })
        })
    }

    insertUser(name, email, password) {
        return new Promise(((resolve, reject) => {
            let sql = `INSERT INTO users(name, email, password) 
                    VALUES ('${name}', '${email}', '${password}')`;

            this.conn.query(sql, err => {
                if (err) {
                    reject(err)
                }
                resolve('oke')
            })
        }))

    }

    getIDMaxUser() {
        console.log(1)
        return new Promise((resolve, reject) => {
            let sql = 'SELECT MAX(id) as userID  FROM users';
            this.conn.query(sql, (err, data)=>{
                if (err) {
                    reject(err)
                }

                resolve(data)
            })

        })
    }

    insertRoleUser(userId, roleId) {
        let sql2 = `INSERT INTO role_user(user_id, role_id) 
                    VALUES ('${userId}', '${roleId}')`;
        this.conn.query(sql2, err =>{
            if (err) {
                throw  new Error(err.message);
            }
        })
    }

    findUserByID(userId) {
        return new Promise(((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id = ${userId}`;
            this.conn.query(sql, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        }))
    }

    updateUser(name, userId) {
        return new Promise(((resolve, reject) => {
            let sql = `UPDATE users SET name = '${name}' WHERE id = ${userId}`;
            this.conn.query(sql, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        }))
    }

}

module.exports = UserModel;
