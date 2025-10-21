import { Sequelize } from "sequelize";
import { seq } from './db.js'

const Product = seq.define('product', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	unit: {
		type: Sequelize.STRING,
		allowNull: false
	},
	weight_grams: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

const Category = seq.define('category', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

const Goods = seq.define('product_item', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	expiration_date: {
		type: Sequelize.DATE,
		allowNull: true
	}
})

Category.hasMany(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Product.hasOne(Goods, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export { Category, Product, Goods }