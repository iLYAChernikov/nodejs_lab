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

const User = seq.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	activationLink: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isActivated: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	resetPasswordToken: {
		type: Sequelize.STRING,
		allowNull: true
	}
})

const Profile = seq.define('profile', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	avatar: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

Category.hasMany(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Product.hasOne(Goods, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.hasOne(Profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export { Category, Product, Goods, User, Profile }