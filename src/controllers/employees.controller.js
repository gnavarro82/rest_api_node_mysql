import { pool } from "../db.js";


//Listar los empleados
export const getEmployees = async (req, res) => {
    try {
        //throw new Error('DB-Error')//hasta que no lo quite  no se ira el error en esta funcion
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio algun error"
        })
    }
}

//obteniendo un empleado por id
export const getEmployeeId = async (req, res) => {
    try {
        //obteniedo el id por parametro
        const id = req.params.id
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        //si rows esta vacio
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'No se encontro el empleado' })
        }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio algun error"
        })
    }
}



export const createEmployees = async (req, res) => {
    //debe recibir los valores que el cliente enviara 
    const { name, salary } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES(?,?)', [name, salary])
        //res.send({rows})
        res.send({
            id: rows.insertId,
            name,
            salary
        })
        /* respuesta
    {
  "rows": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 6,  ================= VALOR IR DEL NUEVO REGISTRO
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  }
}    
    */
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio algun error"
        })
    }

}

export const deleteEmployees = async (req, res) => {
    try {
        //extraemos solo los valores del result
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
        console.log(result);
        /* ahora solo devuelve este objeto
        ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
        }
        Validammos que el affectedRows sea menor o = a cero
        */
        if (result.affectedRows <= 0) {
            //si no afecto una fila se envia el mensaje 
            return res.status(404).json({ message: 'No se encontro el empleado' })
        }
        //todo esta bien pero no esta respondiendo nada al cliente
        res.sendStatus(204)

        /* result affectedRows indica que una fila fue afectada o eliminada
        [
      ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      },
      undefined
    ]
        */
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio algun error"
        })
    }


}//final de delete

export const updateEmployees = async (req, res) => {
    //obteniedo el id por parametro
    const { id } = req.params
    //obteniendo los valores  a actualizar
    const { name, salary } = req.body
    //console.log(id, name, salary); obteniedo el id y los valores por console

    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name) , salary = IFNULL(?, salary)  WHERE id = ?', [name, salary, id])
        //MYSQL TIENE EL METDO IFNULL(?) SI EL VALOR ESTA VACIO O NO TE PASO NADA DEJALO CON EL VALOR QUE YA TENIA NAME

        console.log(result);
        /* affectedRows: 1, SI LA FILLA AFECTA ES 1 = A QUE ACTUALIZO LOS DATOS
        SI LA FILA AFECTA ES = 0 NO ACTUALIZO NADA
        ResultSetHeader {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: 'Rows matched: 1  Changed: 0  Warnings: 0',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0
    } */
        if (result.affectedRows === 0) {
            //si no afecto una fila se envia el mensaje 
            return res.status(404).json({ message: 'No se encontro el empleado' })
        }
        //devolviendo los datos del empleado actualizado al cliente
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio algun error"
        })
    }

}


