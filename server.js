const http = require('http');
const qs = require('qs');
const url = require('url');
let UserController = require('./controllers/UserController')
let AuthController = require('./controllers/AuthController')

let userContr = new UserController();
let authContr = new AuthController();

const server = http.createServer((req, res) => {
    let pathUrl = url.parse(req.url).pathname;

        switch (pathUrl) {
            case "/users":
                // kiem tra login
                authContr.checkAccountLogin(req, res);

                userContr.getPageList('./views/users/list.html', req, res);
                break;
            case "/users/create":
                // kiem tra login
                authContr.checkAccountLogin(req, res);

                if (req.method === 'GET') {
                    userContr.showFormAdd('./views/users/add.html', req, res)
                } else {
                    userContr.add(req, res)
                }
                break;
            case '/users/edit':
                //lay id tren url
                let queryUrl = url.parse(req.url).query;
                let id = qs.parse(queryUrl).id;
                console.log(id)

                if (req.method === 'GET') {
                    userContr.showFormEdit('./views/users/edit.html', req, res, id)
                } else if (req.method === 'POST') {
                    userContr.edit(req, res, id)
                }

                break;

            case '/login':
                authContr.login(req, res);
                break;
            default:
                res.end('404 Not Found');

        }




})

server.listen(8080, 'localhost', () => {
    console.log('server listening on port 8080')
})
