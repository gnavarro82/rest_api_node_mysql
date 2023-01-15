import { Router } from "express"
const router = Router()
//la exportacion debe ser despues del router() porque genera error si esta antes
import { getEmployees, createEmployees, updateEmployees, deleteEmployees,getEmployeeId } from '../controllers/employees.controller.js'

router.get('/employes', getEmployees)
router.get('/employes/:id', getEmployeeId)
router.post('/employes', createEmployees)
// si hay que actualizar todos los datos usar put
//router.put('/employes/:id', updateEmployees)// si no le colocas valor a un campo lo guarda como null en la bbdd

router.patch('/employes/:id', updateEmployees)// permite actualizar parcialmente o el nombre o el salario

router.delete('/employes/:id', deleteEmployees)



export default router
