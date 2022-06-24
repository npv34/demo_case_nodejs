const cookie = require('cookie')
const fs = require('fs');
const qs = require('qs');

class AuthController {
    constructor() {
    }

    checkAccountLogin(req, res) {
        //b1: lấy cookie từ request của client
        let cookieClient = cookie.parse(req.headers.cookie || '');
        console.log(cookieClient)
        if (cookieClient.name) {
            // check xem cookie co ten session va session con ton tai khong


            // lay name_file_session
        } else {
            res.writeHead(301, {Location: '/login'});
            res.end();
        }
    }

    login(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/login.html', 'utf8',  ((err, data) => {
                if (err) {
                    throw new Error(err.message)
                }

                res.writeHead(200, 'success', {'Content-type': 'text/html'})
                res.write(data);
                res.end();
            }))
        } else {
            // xu ly method post
            // b1. Lay lieu tu form
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', () => {
                let dataFormLogin = qs.parse(data);

                // so sanh xem account co ton tai o csdl
                // vi du fix cung data
                if (dataFormLogin.email === 'admin@gmail.com'
                && dataFormLogin.password === '1234') {
                    // b1.1 Tao session login
                    let sessionUser = {
                        sessionLogin: {
                            user: {
                                email: dataFormLogin.email,
                                phone: "090909009"
                            }
                        }
                    }

                    // b1.2 tao file luu session
                    let nameFileSession = Date.now();

                    // b1.3 lu session vao file
                    fs.writeFile(`./session/${nameFileSession}.txt`, JSON.stringify(sessionUser), err => {
                        if (err) {
                            throw new Error(err.message)
                        }
                        console.log('created session success!')
                    })

                    // b1.4 Tao cookie
                    let cookieOfSession = {
                        name_file_session:  nameFileSession
                    }

                    //b1.5 set cookie vao header cua response
                    res.setHeader('set-cookie',  cookie.serialize('name', JSON.stringify(cookieOfSession)))

                    // dieu huong
                    res.writeHead(301, {Location: '/users'})
                    res.end()
                }

            })

        }
    }
}

module.exports = AuthController;
