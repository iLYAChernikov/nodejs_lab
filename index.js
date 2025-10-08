import express from 'express'
import { seq } from './db.js'
import { Category, Product, Goods } from './models.js'
import { router } from './router.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use('/api', router)

seq
	.authenticate()
	.then(() => console.log('MySQL DB was connected'))
	.catch((error) => console.error('Connection error:', error))

seq.sync().then((result) => {
	console.log('DB Data was Synchronized')
})

app.listen(PORT, () => {
	console.log('Server was started on port - ', PORT)
})

app.get("/start", (req, res) => {
	Category.bulkCreate([{ name: "Молочные продукты" }, { name: "Фрукты" }, { name: "Мясо" }])
	Product.bulkCreate([
		{ name: "Молоко", unit: "литр", weight_grams: 1000, categoryId: 1 },
		{ name: "Яблоки", unit: "килограмм", weight_grams: 1000, categoryId: 2 },
		{ name: "Тушёнка", unit: "консервы", weight_grams: 350, categoryId: 3 },
		{ name: "Куриное филе", unit: "килограмм", weight_grams: 1000, categoryId: 3 },
		{ name: "Бананы", unit: "килограмм", weight_grams: 1000, categoryId: 2 }
	])
	Goods.bulkCreate([
		{ price: 85.0, expiration_date: '2025-10-18', productId: 1 },
		{ price: 170.0, expiration_date: '2025-10-12', productId: 2 },
		{ price: 220.0, expiration_date: '2025-10-10', productId: 2 },
		{ price: 250.0, expiration_date: '2026-12-05', productId: 3 },
		{ price: 150.0, expiration_date: '2025-10-14', productId: 5 }
	])
	res.status(200).json('Data Base was filled')
})

app.get("/", (req, res) => {
	res.status(200).json('Welcome to Market!!!')
})