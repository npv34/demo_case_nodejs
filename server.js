const http = require('http')
const url = require('url')
let UserController = require('./controllers/UserController')

let userContr = new UserController();

const server = http.createServer((req, res) => {
    let pathUrl = url.parse(req.url).pathname;

    switch (pathUrl) {
        case "/users":
            userContr.getPageList('./views/users/list.html', req, res);
            break;
        case "/users/create":
            if (req.method === 'GET') {
                userContr.showFormAdd('./views/users/add.html', req, res)
            } else {
                userContr.add(req, res)
            }
            break;
        default:
            res.end('404 Not Found');

    }


})

server.listen(8080, 'localhost', () => {
    console.log('server listening on port 8080')
})
