import { Router } from "express"
//cuando se crean los propios modulos hay qu poner a extension js

import {ping} from '../controllers/index.controller.js'
const router = Router()


//PROBANDO LA BBDD:
router.get('/ping', ping)

export default router
