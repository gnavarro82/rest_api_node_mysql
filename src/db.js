import {createPool} from 'mysql2/promise'

//objeto de conexion que espera los parametros

export const pool = createPool({
	host:'localhost',
	user:'root',
	password:'navarro',
	port:3306,
	database:'companydb'
})
