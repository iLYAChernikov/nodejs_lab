import { where } from "sequelize";
import { Product } from "../models/models.js";

class productController {
	async createIntoCategory(req, res) {
		const newProd = {
			categoryId: req.params.cat,
			name: req.body.name,
			unit: req.body.unit,
			weight_grams: req.body.weight_grams
		}
		const result = await Product.create(newProd)
		console.log('product:', result)
		res.json(newProd)
	}

	async create(req, res) {
		const newProd = {
			categoryId: req.body.categoryId,
			name: req.body.name,
			unit: req.body.unit,
			weight_grams: req.body.weight_grams
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
		const result = await Product.update(
			{
				categoryId: req.body.categoryId,
				name: req.body.name,
				unit: req.body.unit,
				weight_grams: req.body.weight_grams
			}, { where: { id: req.body.id } })
		res.json(result)
	}

	async delete(req, res) {
		const result = await Product.destroy({ where: { id: req.params.id } })
		res.json(result)
	}
}

export default new productController()