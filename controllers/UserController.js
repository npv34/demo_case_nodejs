let UserModel = require("../models/UserModel");
const fs = require('fs');
const qs = require('qs');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    getPageList(pathFile, req, res) {
        this.userModel.getUsers().then(users => {
            fs.readFile(pathFile, 'utf8', (err, data) => {
                if (err) {
                    throw new Error(err.message)
                }

                let html = '';
                users.forEach((user, index) => {
                    html += `<tr>`;
                    html += `<td>${index + 1}</td>`;
                    html += `<td>${user.name}</td>`;
                    html += `<td>${user.email}</td>`;
                    html += `</tr>`;
                })
                data = data.replace('{list-user}', html)

                res.writeHead(200, 'oke', {'Content-type': 'text/html'})
                res.write(data);
                res.end();
            })
        })
    }

    showFormAdd(pathFile, req, res) {

        this.userModel.getRoleUser().then(roles => {
            fs.readFile(pathFile, 'utf8', (err, data) => {
                if (err) {
                    throw new Error(err.message)
                }

                let html = '';

                roles.forEach(role => {
                    html += `<input type="checkbox" value="${role.id}" name="roleID">${role.name}`
                })

                data = data.replace('{list-role}', html)

                res.writeHead(200, 'oke', {'Content-type': 'text/html'})
                res.write(data);
                res.end();
            })
        })


    }

    add(req, res) {
        let data = '';

        req.on('data', (chunk) => {
            data += chunk
        })

        req.on('end', () => {
            let dataForm = qs.parse(data);
            this.userModel.storeUser(dataForm.name, dataForm.email, dataForm.password, dataForm.roleID)
            res.writeHead(301, {Location: '/users'})
            res.end()

        })

    }
}

module.exports = UserController;
