import express from "express"
//cuando se crean los propios modulos hay qu poner a extension js
import employeesRouter from './routes/employees.routes.js'
import indexRouter from './routes/index.routes.js'


const app = express()

app.use(express.json())

//rutas
app.use(indexRouter)
app.use('/api', employeesRouter)

//VALIDAR RUTAS QUE NO EXISTEN
//una ves pase por esas rutas quiere decir que no coincidio con la ruta
app.use((req, res, next) => {
	return res.status(404).json({
		message: "No se encontro lo que buscaba !!!"
	})
})

app.listen(3000, () => {
	console.log('servidor corriendo en el puerto 3000')
})
