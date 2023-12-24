import sql, { RowDataPacket } from "mysql2";

class MySQL {
    pool: sql.Pool;

    constructor() {
        this.pool = sql.createPool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT!),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            connectionLimit: 10,
        });

        this.query(`CREATE TABLE IF NOT EXISTS profileviews (
            id INT NOT NULL AUTO_INCREMENT,
            identifier VARCHAR(100) NOT NULL UNIQUE,
            views BIGINT NOT NULL,
            PRIMARY KEY (id)
        );`);
    }

    getPool() {
        return this.pool;
    }

    async query(sql: string, data?: any[]): Promise<RowDataPacket[]> {
        return new Promise((resolve, reject) => {
            this.pool
                .promise()
                .query(sql, data)
                .then((res) => resolve(res[0] as RowDataPacket[]))
                .catch((err) => reject(err));
        });
    }
}

const mysql = new MySQL();
export default mysql;
