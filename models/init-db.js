import { seq } from './db.js'
import { Category, Product, Goods } from './models.js'

async function initializeDatabase() {
	try {
		// Аутентификация и синхронизация БД
		await seq.authenticate()
		console.log('SQLite DB was connected')

		await seq.sync({ force: false }) // force: true пересоздает таблицы, false - только если не существуют
		console.log('DB Data was Synchronized')

		// Проверяем, есть ли уже данные в базе
		const existingCategories = await Category.count()

		if (existingCategories === 0) {
			// Заполняем начальными данными
			await Category.bulkCreate([
				{ name: "Молочные продукты" },
				{ name: "Фрукты" },
				{ name: "Мясо" }
			])

			await Product.bulkCreate([
				{ name: "Молоко", unit: "литр", weight_grams: 1000, categoryId: 1 },
				{ name: "Яблоки", unit: "килограмм", weight_grams: 1000, categoryId: 2 },
				{ name: "Тушёнка", unit: "консервы", weight_grams: 350, categoryId: 3 },
				{ name: "Куриное филе", unit: "килограмм", weight_grams: 1000, categoryId: 3 },
				{ name: "Бананы", unit: "килограмм", weight_grams: 1000, categoryId: 2 }
			])

			await Goods.bulkCreate([
				{ price: 85.0, expiration_date: '2025-10-18', productId: 1 },
				{ price: 170.0, expiration_date: '2025-10-12', productId: 2 },
				{ price: 220.0, expiration_date: '2025-10-10', productId: 2 },
				{ price: 250.0, expiration_date: '2026-12-05', productId: 3 },
				{ price: 150.0, expiration_date: '2025-10-14', productId: 5 }
			])

			console.log('Database was filled with initial data')
		} else {
			console.log('Database already contains data, skipping initialization')
		}

		process.exit(0)
	} catch (error) {
		console.error('Error during database initialization:', error)
		process.exit(1)
	}
}

initializeDatabase()