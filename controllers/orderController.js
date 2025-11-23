import { where } from "sequelize";
import { Category, Order, OrderItem, Product, User } from "../models/models.js";

class orderController {
	async create(req, res, next) {
		const visiter = await User.findOne({ where: { id: req.body.userId } })
		if (!visiter) {
			return next(Error("Пользователь не зарегистрирован!"))
		}

		const order = {
			userId: req.body.userId,
			date: req.body.date
		}
		const result = await Order.create(order)
		console.log('Order:', result)
		res.json(order)
	}

	async createByUser(req, res, next) {
		const visiter = await User.findOne({ where: { id: req.params.userId } })
		if (!visiter) {
			return next(Error("Пользователь не зарегистрирован!"))
		}

		const order = {
			userId: req.params.userId,
			date: req.body.date
		}
		const result = await Order.create(order)
		console.log('Order:', result)
		res.json(order)
	}

	async addItem(req, res, next) {
		const { productId, quantity } = req.body;
		const product = await Product.findOne({ where: { id: productId } });
		if (!product) {
			return next(Error("Продукт не найден!"))
		}
		const order = await Order.findOne({ where: { id: req.params.id } });
		if (!order) {
			return next(Error("Заказ не найден!"))
		}

		const item = {
			orderId: req.params.id,
			productId: productId,
			price_per_one: product.price,
			quantity: quantity
		}
		const result = await OrderItem.create(item)
		console.log('Item:', result)

		order.amount = order.amount + item.price_per_one * item.quantity;
		await order?.save()

		res.json(result)
	}

	async deleteItem(req, res, next) {
		const item = await OrderItem.findOne({ where: { id: req.params.id } });
		if (!item) {
			return next(Error("Продукт не найден!"))
		}
		const order = await Order.findOne({ where: { id: req.params.id } });
		if (!order) {
			return next(Error("Заказ не найден!"))
		}

		order.amount = order.amount - item.price_per_one * item.quantity;

		await Order.destroy({ where: { id: req.params.id } })
		await order?.save()

		const result = await OrderItem.create(item)

		res.json(result)
	}

	async getAll(req, res) {
		const { page, count } = req.query;

		const pageNum = Number(page) || 1;
		const lim = Number(count) || 5;
		const offset = (pageNum - 1) * lim;
		
		const all = await Product.findAndCountAll({			
			limit: lim,
			offset: offset
		});

		res.json(all)
	}

	async getOrdersByUser(req, res) {
		const result = await Order.findAll({ where: { userId: req.params.id } })
		res.json(result)
	}

	async getByCategory(req, res, next) {
		const category = await Category.findOne({ where: { id: req.params.categ } });
		if (!category)
			return next(Error("Категория не найдена!"))

		const result = await Product.findAll({ where: { categoryId: req.params.categ } })
		res.json(result)
	}

	async getOrderItems(req, res) {
		const items = await OrderItem.findAll({ where: { orderId: req.params.id } });
		res.json(items)
	}

	async buyOrder(req, res) {
		const items = await OrderItem.findAll({ where: { orderId: req.params.id } });
		var sum = 0
		for (const item of items) {
			sum = sum + item.price_per_one * item.quantity
		}
		const result = await Order.update(
			{
				status: "buy",
				amount: sum
			}, {
			where: { id: req.params.id }
		});
		res.json(sum)
	}

	async delete(req, res) {
		const result = await Order.destroy({ where: { id: req.params.id } })
		res.json(result)
	}
}

export default new orderController()