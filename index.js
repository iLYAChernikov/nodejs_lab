import express from 'express'
import { seq } from './db.js'
import { Category, Product, Goods } from './models.js'

const app = express()
const PORT = 5000

app.use(express.json())

seq
	.authenticate()
	.then(() => console.log('MySQL DB was connected'))
	.catch((error) => console.error('Connection error:', error))

seq.sync().then((result) => {
	console.log('Synchronized')
})

app.listen(PORT, () => {
	console.log('Server was started on port - ', PORT)
})

let goods = [
	{
		id: 1,
		name: "Молоко",
		category: "Молочные продукты",
		unit: "литр",
		price: 85,
		weight_grams: 1000,
		expiration_date: '2025-10-15'
	},
	{
		id: 2,
		name: "Яблоки",
		category: "Фрукты",
		unit: "килограмм",
		price: 170,
		weight_grams: 1000,
		expiration_date: '2025-10-12'
	},
	{
		id: 3,
		name: "Тушёнка",
		category: "Мясо",
		unit: "консервы",
		price: 250,
		weight_grams: 350,
		expiration_date: '2026-12-05'
	},
	{
		id: 4,
		name: "Куриное филе",
		category: "Мясо",
		unit: "килограмм",
		price: 450,
		weight_grams: 1000,
		expiration_date: '2025-10-03',
	},
	{
		id: 5,
		name: "Бананы",
		category: "Фрукты",
		unit: "килограмм",
		price: 150,
		weight_grams: 1000,
		expiration_date: '2025-10-10'
	}
]

app.get("/", (req, res) => {
	res.status(200).json('Welcome to Market!!!')
})

app.get("/catalog", (req, res) => {
	res.status(200).json(goods)
})

app.get("/catalog/:id", (req, res) => {
	const prod = goods.find(g => g.id == req.params.id)
	res.status(200).json(prod)
})

app.get("/catalog/f/:cat", (req, res) => {
	const prods = goods.filter(g => g.category.toLowerCase() == req.params.cat.toLowerCase())
	res.status(200).json(prods)
})

app.post("/catalog", (req, res) => {
	const newProd = {
		id: Date.now(),
		name: req.body.name,
		category: req.body.category,
		unit: req.body.unit,
		price: req.body.price,
		weight_grams: req.body.weight_grams,
		expiration_date: req.body.expiration_date
	}
	goods.push(newProd)
	res.status(200).json(newProd)
})

app.post("/catalog/add/:cat", (req, res) => {
	const newProd = {
		id: Date.now(),
		name: req.body.name,
		category: req.params.cat,
		unit: req.body.unit,
		price: req.body.price,
		weight_grams: req.body.weight_grams,
		expiration_date: req.body.expiration_date
	}
	goods.push(newProd)
	res.status(200).json(newProd)
})

app.put("/catalog/:id", (req, res) => {
	const chProd = {
		id: req.params.id,
		name: req.body.name,
		category: req.body.category,
		unit: req.body.unit,
		price: req.body.price,
		weight_grams: req.body.weight_grams,
		expiration_date: req.body.expiration_date
	}
	for (let i = 0; i < goods.length; i++) {
		if (goods[i].id == req.params.id) {
			goods[i] = chProd
		}
	}
	res.status(200).json(chProd)
})

app.delete("/catalog/:id", (req, res) => {
	goods = goods.filter(g => g.id != req.params.id)
	res.status(200).json("Deleted")
})