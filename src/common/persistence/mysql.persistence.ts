import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../../../config/${process.env.APP_ENV}.env`
});


export default createPool({
    host: process.env.db_mysql_host,
    user: process.env.db_mysql_user,
    password: process.env.db_mysql_password,
    database: process.env.db_mysql_database,
    decimalNumbers: true
});
