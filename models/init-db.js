import { seq } from './db.js'
import { Category, Product } from './models.js'

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
				{ name: "Молоко", price: "69.0", categoryId: 1 },
				{ name: "Яблоки", price: "30.0", categoryId: 2 },
				{ name: "Тушёнка", price: "220.0", categoryId: 3 },
				{ name: "Куриное филе", price: "300.0", categoryId: 3 },
				{ name: "Бананы", price: "100.0", categoryId: 2 }
			])

			console.log('База данных была заполнена первичными данными')
		} else {
			console.log('База данных уже содержит данные, поэтому инициализация пропущена')
		}

		process.exit(0)
	} catch (error) {
		console.error('Ошибка при инициализации базы данных:', error)
		process.exit(1)
	}
}

initializeDatabase()