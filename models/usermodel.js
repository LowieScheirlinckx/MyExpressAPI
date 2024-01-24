import poolPromise from '../Database/database.js'

// const create = async (user) => {
//     const pool = await poolPromise;
//     console.log(user)
//     const [results, fields] = await pool
//         .query(`INSERT INTO user (name)
//                 VALUES ('${user.name}')`)
//         console.log(results," - split - ", fields)
//     return results.affectedRows;
// }

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