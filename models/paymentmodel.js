import poolPromise from '../Database/database.js'

const create = async (payment) => {
    const pool = await poolPromise;
    console.log(payment)
    const [results, fields] = await pool
        .query(`INSERT INTO payment (name,date, amount)
                VALUES ('${payment.user_id}','${payment.date}'${payment.amount},)`)
    return results.affectedRows;
}

const get = async (usedId) => {
    const pool = await poolPromise;
    const rs = await pool
        .query(`SELECT * FROM payment WHERE user_id like '${usedId}'`);

    return rs[0];
}

export default {
    create,
    get
}