import poolPromise from '../Database/database.js'

const get = async (username) => {
    const pool = await poolPromise;
    const rs = await pool
        .query(`SELECT * FROM users WHERE name like '${username}'`);

    return rs[0][0];
}
const getById = async (userId) => {
    const pool = await poolPromise;
    const rs = await pool
        .query(`SELECT * FROM user WHERE id like '${userId}'`);

    return rs[0][0];
}

export default {
    get, getById
}