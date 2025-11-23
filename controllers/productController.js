import { where } from "sequelize";
import { Product } from "../models/models.js";
import { v4 } from "uuid"
import path from 'path'

class productController {
	async createIntoCategory(req, res) {
		const newProd = {
			categoryId: req.params.cat,
			name: req.body.name,
			price: req.body.price,
			stock_quantity: req.body.stock_quantity,
			description: req.body.description
		}
		const result = await Product.create(newProd)
		console.log('product:', result)
		res.json(newProd)
	}

	async create(req, res) {
		const newProd = {
			categoryId: req.body.categoryId,
			name: req.body.name,
			price: req.body.price,
			stock_quantity: req.body.stock_quantity,
			description: req.body.description
		}
		const result = await Product.create(newProd)
		console.log('product:', result)
		res.json(newProd)
	}

	async getAll(req, res) {
		const all = await Product.findAll()
		res.json(all)
	}

	async change(req, res) {
		try {
			const { image } = req.files;
			const fileName = v4() + path.extname(image.name);
			const filePath = path.resolve(path.resolve(), 'uploads', fileName);

			await image.mv(filePath);

			const { name, price, stock_quantity, description, categoryId } = req.body
			const imageLink = '/uploads/' + fileName

			const result = await Product.update({
				categoryId,
				name,
				image: imageLink,
				stock_quantity,
				price,
				description
			},
				{ where: { id: req.params.id } })

			res.status(200).json(result)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async delete(req, res) {
		const result = await Product.destroy({ where: { id: req.params.id } })
		res.json(result)
	}
}

export default new productController()