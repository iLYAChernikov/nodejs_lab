import express from 'express'

const app = express()
const PORT = 5000

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