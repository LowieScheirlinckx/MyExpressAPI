import poolPromise from '../Database/database.js'

const create = async (payment) => {
    const pool = await poolPromise;
    console.log(payment)
    const [results, fields] = await pool
        .query(`INSERT INTO payments (user_id, mollie_id, description , date, currency, amount, status)
                VALUES ('${payment.user_id}','${payment.mollie_id}', '${payment.description}','${payment.createdAt}', '${payment.currency}','${payment.amount}','${payment.status}')`)
    return results.affectedRows;
}

const get = async (usedId) => {
    const pool = await poolPromise;
    const rs = await pool
        .query(`SELECT * FROM payments WHERE user_id like '${usedId}'`);
    return rs[0];
}

const update = async (payment) => {
    const pool = await poolPromise;
    const [results, fields] = await pool
        .query(`UPDATE payments
        SET status = '${payment.status}'
        WHERE mollie_id = '${payment.mollie_id}';`)
    return results.affectedRows;
}

export default {
    create,
    get, 
    update
}