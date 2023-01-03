const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
	connectionLimit : 100,
	host: process.env.dbhost,
	user: process.env.dbuser,
	password: process.env.dbpass,
    database: process.env.dbdata
});

function getPool(){ return pool; }

async function query(sql){
    var results;
    await pool.promise().query(sql).then((res, err) => { if (err) throw new Error(err); results = res; });
    return results[0];
}

async function init(){
    await query("CREATE TABLE IF NOT EXISTS `profileviews` (`id` INT NOT NULL AUTO_INCREMENT, `identifier` VARCHAR(100) NOT NULL, `views` BIGINT NOT NULL, PRIMARY KEY (`id`));")
}

module.exports = {
    query: query,
    getPool: getPool,
    init: init
}