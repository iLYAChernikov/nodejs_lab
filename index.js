import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { seq } from './models/db.js'
import { router } from './routes/router.js'
import fileUpload from 'express-fileupload'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(fileUpload({
	createParentPath: true,					//	автосоздание папки загрузок
	limits: { fileSize: 50 * 1024 * 1024 },	//	лимит - 50 Mb
	useTempFiles: false						//	true - для больших файлов
}))

app.use('/api', router)

app.use((err, req, res, next) => {
	console.log(err.message)
	res.status(500).json(err.message)
	next()
})

seq
	.authenticate()
	.then(() => console.log('SQLite DB was connected'))
	.catch((error) => console.error('Connection error:', error))

seq.sync().then((result) => {
	console.log('SQLite DB was Synchronized')
})

app.listen(PORT, () => {
	console.log('Server was started on port - ', PORT)
})

app.get("/", (req, res) => {
	res.status(200).json('Welcome to Market!!!')
})