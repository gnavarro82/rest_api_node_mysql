import { pool } from "../db.js"
//PROBANDO LA BBDD:

export const ping = ('/ping', async (req, res) => {
    //es asincrono
    //desde esta respuesta quiero extarer result
    const [result] = await pool.query('SELECT 2+2 AS result')
    res.json(result)

})


