import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";

export async function connectSingleStore(
    config: Partial<mysql.ConnectionOptions> = {}
) {
    dotenv.config();

    const baseConfig: mysql.ConnectionOptions = {
        host: process.env.HOST,
        password: process.env.PASSWORD,
        user: "admin",
    };

    return await mysql.createConnection({
        ...baseConfig,
        ...config,
    });
}

export async function stopSingleStore(conn: mysql.Connection) {
    await conn.end();
}
