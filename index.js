import express from 'express'
import { seq } from './models/db.js'
import { router } from './routes/router.js'
import fileUpload from 'express-fileupload'

const app = express()
const PORT = 5000

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(fileUpload({}))

app.use('/api', router)

seq
	.authenticate()
	.then(() => console.log('SQLite DB was connected'))
	.catch((error) => console.error('Connection error:', error))

seq.sync().then((result) => {
	console.log('DB Data was Synchronized')
})

app.listen(PORT, () => {
	console.log('Server was started on port - ', PORT)
})

app.get("/", (req, res) => {
	res.status(200).json('Welcome to Market!!!')
})