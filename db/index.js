const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lwhlwh',
    database: 'hotai_server'
})

// db.query('select * from users', (err, data) => {
//     if (err) {
//         console.log(err.message)
//         return
//     }
//     console.log(data)
// })

module.exports = db