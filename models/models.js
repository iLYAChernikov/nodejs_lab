import { Sequelize } from "sequelize";
import { seq } from './db.js'

//	пользователи
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
	},
	role: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//	товары
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
	image: {
		type: Sequelize.STRING,
		allowNull: true
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	stock_quantity: {
		type: Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 0
	}
});

//	категории
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
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true
	}
});

//	заказы
const Order = seq.define("order", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	date: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	amount: {
		type: Sequelize.FLOAT,
		allowNull: false,
		defaultValue: 0
	},
	status: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "waiting"
	}
});

//	товары заказов
const OrderItem = seq.define("order_item", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	price_per_one: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1
	}
});

//	отзывы
const Review = seq.define("review", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
		unique: true
	},
	text: {
		type: Sequelize.TEXT,
		allowNull: true
	}
});

User.hasMany(Order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Order.belongsTo(User);
User.hasMany(Review, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Review.belongsTo(User);
Product.hasOne(Review, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Order.hasMany(OrderItem, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.hasOne(OrderItem, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Order.hasOne(OrderItem, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Category.hasOne(Product, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Product.belongsTo(Category);

export { User, Category, Product, Order, OrderItem, Review }